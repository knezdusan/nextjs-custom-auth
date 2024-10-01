"use server"

import { signupFormSchema, loginFormSchema, type UserDb, type ClientDb } from "@/lib/def";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createDbClient } from '@/lib/supabase/server'

export async function signup(prevState: unknown, formData: FormData) {

  let user = prevState as UserDb;

  // validate credentials
  const validationResult = signupFormSchema.safeParse({
    company: formData.get("company"),
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });


  if (!validationResult.success) {
    console.log("there are errors: ", validationResult.error);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  const { company, name, email, password } = validationResult.data;

  // validate the website url - if anything appart of the hostname is submitted it will be invalid
  const url = new URL(website);
  if ('https://' + url.hostname !== website) {
    return {
      errors: {
        website: ["Company website url must be in the format https://example.com. Any other section of the website can be configured later."],
      },
    };
  }

  // check if client already exists
  const clientExists = await prisma.client.findUnique({ where: { website } });
  if (clientExists) {
    return {
      errors: {
        website: ["Client already exists, try to login instead, or contact your staff admin who can add your account"],
      },
    };
  }

  // validate if email belongs to the company
  if (email.split('@')[1] !== url.hostname) {

    // slugify the user name
    const nameSlug = slugify(name);

    return {
      errors: {
        email: [`Email must belong to the Company, eg: ${nameSlug}@${url.hostname}`],
      },
    };
  }

  // check if user already exists
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return {
      errors: {
        email: ["User already exists, try to login instead"],
      },
    };
  }

  //


  // Save client data to database
  let client: ClientDb | undefined;
  try {
    client = await prisma.client.create({
      data: {
        company,
        website,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          company: [error.message],
        },
      }
    }
  }
  finally {
    await prisma.$disconnect();
  }

  if (!client) return {
    errors: {
      company: ["Client creation failed, please try again later"],
    },
  }

  // Save user data to database
  const hashedUserPassword = hashSync(password as string, 10);

  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedUserPassword,
        clientId: client.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          password: [error.message],
        },
      }
    }
  }
  finally {
    await prisma.$disconnect();
  }

  // create session
  await createAuthSession({
    company,
    website,
    email: email,
    name: name,
    role: user.role,
    status: client.status,
  })
}

export async function login(prevState: unknown, formData: FormData) {

  // validate credentials
  const validationResult = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });


  if (!validationResult.success) {
    console.log("there are errors: ", validationResult.error);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validationResult.data;


  // check if user with the given email and hashed password already exists
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !compareSync(password, user.password)) {
    return {
      errors: {
        password: ["Invalid email or password"],
      },
    };
  }

  // Get client
  const client = await prisma.client.findUnique({ where: { id: user.clientId } });
  if (!client) {
    return {
      errors: {
        password: ["User credentials do not match any client, please contact us for support"],
      },
    };
  }

  // create session
  await createAuthSession({
    company: client.company,
    website: client.website,
    email: email,
    name: user.name,
    role: user.role,
    status: client.status,
  })
}
