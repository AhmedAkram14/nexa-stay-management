import supabase, { supabaseUrl } from './supabase';

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const updatePayload = {};
  if (password) updatePayload.password = password;
  if (fullName) updatePayload.data = { fullName };

  let data = null;
  if (Object.keys(updatePayload).length > 0) {
    const res = await supabase.auth.updateUser(updatePayload);
    if (res.error) {
      throw new Error(res.error.message);
    }
    data = res.data;
  }

  if (!avatar) {
    if (data) return data;
    const { data: got, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message);
    }
    return { user: got.user };
  }

  const user =
    data?.user ?? (await supabase.auth.getUser()).data?.user;
  if (!user) {
    throw new Error("Could not resolve user");
  }
  const fileName = `avatar-${user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) {
    throw new Error(error2.message);
  }
  return updatedUser ?? data;
}
