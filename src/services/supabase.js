import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = "https://gfodduvesbcnfevnpiat.supabase.co";
const supabaseKey = "sb_publishable_W4C2c6LiVVySPAmukl0_hw_hCNMoeNh";

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
