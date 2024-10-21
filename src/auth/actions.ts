"use server"

import { signupFormSchema, loginFormSchema, EmailData, authRecoveryFormSchema, passwordResetFormSchema } from "@/lib/def";
import { hashSync, compareSync } from "bcrypt-ts";
import { createClient } from '@/supabase/server';
import { sendEmail } from "@/lib/mailer";
import { encryptDataString } from "@/lib/hash";
import { createAuthSession } from "./session";
import { redirect } from "next/navigation";


// signup() -> Signup form server action ------------------------------------------------------------>

export async function signup(prevState: unknown, formData: FormData) {

  // validate credentials
  const validationResult = signupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    console.log("there are errors: ", validationResult.error);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  const { name, email, company, password } = validationResult.data;

  // extract hostname from email
  const hostname = email.split("@")[1];

  // DB operations
  const supabaseClient = createClient();

  // check if client already exists
  const { data: clients, error: clientsError } = await supabaseClient
    .from('clients')
    .select("id")
    // Filters
    .eq('hostname', hostname)

  if (clientsError) {
    console.log('Error while checking if client exists: ', clientsError);
    return {
      errors: {
        password: ["Error processing request, please try again later"],
      },
    };
  }

  if (clients && clients.length > 0) {
    return {
      errors: {
        password: ["Client already exists, try to login instead, or contact your staff admin who can add your account"],
      },
    };
  }

  // check if user already exists
  const { data: users, error: usersError } = await supabaseClient
    .from('users')
    .select("id")
    // Filters
    .eq('email', email)

  if (usersError) {
    console.log('Error while checking if user exists: ', usersError);
    return {
      errors: {
        password: ["Error processing request, please try again later"],
      },
    };
  }

  if (users && users.length > 0) {
    return {
      errors: {
        email: ["User already exists, try to login instead"],
      },
    };
  }

  // Save client data to database
  let clientId = "";
  try {
    const { data, error } = await supabaseClient
      .from('clients')
      .insert([
        { name: company, hostname: hostname },
      ])
      .select('id');

    if (error || !data) {
      throw new Error(error?.message); // This throws an error that can be caught below
    }

    clientId = data[0].id;
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          password: ["Client creation failed, please try again later"],
        },
      }
    }
  }

  if (!clientId || clientId === "") {
    return {
      errors: {
        password: ["Client creation failed, please try again later"],
      },
    }
  }

  // Save user data to database
  const hashedUserPassword = hashSync(password as string, 10);

  try {
    const { data, error } = await supabaseClient
      .from('users')
      .insert([
        { name: name, email: email, password: hashedUserPassword, client_id: clientId },
      ])
      .select('id');

    if (error || !data) {
      throw new Error(error?.message); // This throws an error that can be caught below
    }

    // const userId = data[0].id;
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          password: ["User creation failed, please try again later"],
        },
      }
    }
  }

  // encrypt/hash the email
  const authEmailHash = encryptDataString(email);

  // Extract the first name from the user name
  const firstName = name.split(" ")[0];

  // Send email to the client/user with login link
  const emailData: EmailData = {
    to: email,
    subject: 'Welcome to EntryFrame! Please Verify Your Email Address',
    text: `To finish signing up, you can copy and paste the following URL into your browser:\n\n${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup-confirmation?hash=${authEmailHash}`,
    html: `<h2>Hello ${firstName},</h2><p>Welcome to EntryFrame! 🎉 We're excited to have you on board.<br />To complete your registration, please verify your email address by clicking the link below:</p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup-confirmation?hash=${authEmailHash}">Verify My Email</a><br /><h3>Important:</h3><p>If you didn’t sign up for an EntryFrame account, please ignore this email.</p><p>Thank you,<br />The EntryFrame Team</p>`,
  };

  try {
    const response = await sendEmail(emailData);
    if (!response.success) {
      return {
        errors: {
          password: ["Confirmation email sanding error. Please try to signup again latter."],
        },
      }
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      errors: {
        password: ["Confirmation email sanding error. Please try to signup again latter."],
      },
    }
  }

  // If error "Success" will be returned the form is valid and the verification modal will be shown
  return {
    errors: {
      password: ["Success"],
    },
  }
}


// signin() -> FormSignIn server action  ------------------------------------------------------------>

export async function signin(prevState: unknown, formData: FormData) {

  // validate credentials
  const validationResult = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    console.log("User login errors: ", validationResult.error);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validationResult.data;

  // DB operations
  const supabaseClient = createClient();


  // check if user with the given email and hashed password already exists
  // check if user already exists
  const { data: users, error: usersError } = await supabaseClient
    .from('users')
    .select("*")
    // Filters
    .eq('email', email)

  if (usersError) {
    console.log('Error while checking if user exists: ', usersError);
    return {
      errors: {
        password: ["Error processing request, please try again later"],
      },
    };
  }

  if (!users || users.length === 0) {
    return {
      errors: {
        email: ["Check your email and try again"],
      },
    };
  }

  if (!compareSync(password, users[0].password)) {
    return {
      errors: {
        password: ["Invalid password, please try again"],
      },
    };
  }

  const { name, role, client_id: clientId } = users[0];

  // Get client data
  const { data: clients, error: clientsError } = await supabaseClient
    .from('clients')
    .select("*")
    // Filters
    .eq('id', clientId)

  if (clientsError) {
    console.log('Error while checking if client exists: ', clientsError);
    return {
      errors: {
        password: ["Error processing request, please try again later"],
      },
    };
  }

  if (!clients || clients.length === 0) {
    return {
      errors: {
        password: ["User credentials do not match any client, please contact us for support"],
      },
    };
  }

  const { name: company, hostname, status } = clients[0];

  // Check if user is inactive
  if (status === "INACTIVE") {
    return {
      errors: {
        password: ["User is not active. If you received confirmation email from us, please check your inbox. Otherwise, please contact us for support."],
      },
    };
  }

  // create session
  try {
    await createAuthSession({
      name,
      email,
      role,
      clientId,
      company,
      hostname,
      status,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating auth session:', error.message);
    } else {
      console.error('Unknown error creating auth session:', error);
    }
    // You may also want to handle the error further, e.g., by returning an error response
    return {
      errors: {
        password: ["Login error, please try again later"],
      },
    };
  }

  // Redirect user to dashboard page
  redirect("/dashboard");

  return;

}


// recovery() -> Password RecoverForm server action  ------------------------------------------------------------->

export async function recovery(prevState: unknown, formData: FormData) {
  // validate email
  const validationResult = authRecoveryFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validationResult.success) {
    console.log("Password recovery email validation errors: ", validationResult.error);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  const { email } = validationResult.data;

  // DB operations
  const supabaseClient = createClient();

  // check if user with given email already exists in our database
  const { data: users, error: usersError } = await supabaseClient
    .from('users')
    .select("*")
    // Filters
    .eq('email', email)

  if (usersError) {
    console.log('Password recovery - Error while checking if user exists: ', usersError);
    return {
      errors: {
        password: ["Error processing request, please try again later"],
      },
    };
  }

  if (!users || users.length === 0) {
    return {
      errors: {
        email: ["There is no user with this email"],
      },
    };
  }

  // encrypt/hash the email
  const authEmailHash = encryptDataString(email);

  // Extract the first name from the user name
  const firstName = users[0].name.split(" ")[0];

  // Send email to the client/user with password reset link
  const emailData: EmailData = {
    to: email,
    subject: 'EntryFrame Password Reset',
    text: `Hi ${firstName},\n\nPlease copy paste the following link into your browser to reset your password: ${process.env.NEXT_PUBLIC_BASE_URL}/auth/password-recovery?hash=${authEmailHash}\n\n\nThank you,\nThe EntryFrame Team`,
    html: `<h2>Hello ${firstName},</h2><p>Please click on the link below to reset your password:<br /><a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/password-recovery?hash=${authEmailHash}">Reset Password</a></p><h3>Important:</h3><p>If you didn’t sign up for an EntryFrame account, please ignore this email.</p><p>Thank you,<br />The EntryFrame Team</p>`,
  };

  try {
    const response = await sendEmail(emailData);
    if (!response.success) {
      return {
        errors: {
          password: ["Password reset email sanding error. Please try to signup again latter."],
        },
      }
    }
  } catch (error) {
    console.error("Password recovery - Failed to send email:", error);
    return {
      errors: {
        password: ["Password reset email sanding error. Please try to signup again latter."],
      },
    }
  }

  // If error "Success" will be returned the form is valid and the password reset modal will be shown
  return {
    errors: {
      password: ["Success"],
    },
  }
}

// reset() -> Password ResetForm server action  ------------------------------------------------------------->

export async function reset(prevState: unknown, formData: FormData) {

  // Extract email from prevState
  const email = (prevState as { errors: { password: string[] } }).errors.password[0];

  // validate credentials
  const validationResult = passwordResetFormSchema.safeParse({
    password: formData.get("password1"),
  });

  if (!validationResult.success) {
    console.log("Password reset validation errors: ", validationResult.error);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  const { password } = validationResult.data;

  // Check if password1 and password2 are the same
  if (password !== formData.get("password2")) {
    return {
      errors: {
        password: ["Passwords do not match, please try again"],
      },
    };
  }

  const hashedUserPassword = hashSync(password as string, 10);

  // DB operations
  const supabaseClient = createClient();

  // Update user password
  try {
    await supabaseClient
      .from('users')
      .update({ password: hashedUserPassword })
      .eq('email', email)
  } catch (error) {
    console.log('Error while updating user password: ', error);
    return {
      errors: {
        password: ["Error processing request, please try again later"],
      },
    };
  }

  redirect("/auth/recovery-sign-in");

  return;
}