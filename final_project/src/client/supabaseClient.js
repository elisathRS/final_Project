import { createClient } from "@supabase/supabase-js";

const URL = 'https://muxqnrfhhumsdptgvvpd.supabase.co';
const API_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11eHFucmZoaHVtc2RwdGd2dnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNDA0ODYsImV4cCI6MjAxNDYxNjQ4Nn0.t40oF37sFAmCa3U5MoLDTstIGrB96HXijfpCQYdCOwc';

 const supabase = createClient(URL, API_KEY);

export default supabase;