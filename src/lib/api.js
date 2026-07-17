import { supabase } from './supabase'
export async function getProfile(userId){const {data,error}=await supabase.from('profiles').select('*').eq('id',userId).maybeSingle();if(error)throw error;return data}
export async function saveProfile(row){const {error}=await supabase.from('profiles').upsert(row);if(error)throw error}
export async function getHabit(userId){const {data,error}=await supabase.from('habits').select('*').eq('user_id',userId).eq('is_active',true).maybeSingle();if(error)throw error;return data}
export async function saveHabit(row){const {data,error}=await supabase.from('habits').insert(row).select().single();if(error)throw error;return data}
export async function getTickets(userId){const {data,error}=await supabase.from('excuse_tickets').select('*').eq('user_id',userId).order('created_at');if(error)throw error;return data||[]}
export async function saveTickets(rows){const {error}=await supabase.from('excuse_tickets').insert(rows);if(error)throw error}
export async function getToday(userId,date){const {data,error}=await supabase.from('daily_records').select('*').eq('user_id',userId).eq('record_date',date).maybeSingle();if(error)throw error;return data}
export async function getYesterdayPending(userId,date){const {data,error}=await supabase.from('daily_records').select('*').eq('user_id',userId).eq('record_date',date).is('result_type',null).maybeSingle();if(error)throw error;return data}
export async function createPrediction(row){const {data,error}=await supabase.rpc('create_daily_prediction',{p_habit_id:row.habit_id,p_ticket_id:row.predicted_ticket_id,p_share:row.is_shared});if(error)throw error;return data}
export async function updateResult(id,result_type,score,actual_ticket_id=null,matched=null){const {error}=await supabase.rpc('record_daily_result',{p_record_id:id,p_result_type:result_type,p_action_score:score,p_actual_ticket_id:actual_ticket_id,p_prediction_matched:matched});if(error)throw error}
export async function weekly(userId){const {data,error}=await supabase.from('daily_records').select('*').eq('user_id',userId).order('record_date',{ascending:false}).limit(7);if(error)throw error;return data||[]}
export async function publicFeed(category){const {data,error}=await supabase.from('public_excuse_feed').select('*').eq('category',category).order('created_at',{ascending:false}).limit(50);if(error)throw error;return data||[]}
export async function react(postId,type,userId){const {error}=await supabase.from('reactions').insert({post_id:postId,reaction_type:type,user_id:userId});if(error&&error.code!=='23505')throw error}
