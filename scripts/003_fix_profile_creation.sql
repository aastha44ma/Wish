-- Create a function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Extract user metadata from auth.users
  insert into public.profiles (id, user_type, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'user_type', 'buyer'),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  
  -- If user is an artisan, create artisan profile with default values
  if coalesce(new.raw_user_meta_data->>'user_type', 'buyer') = 'artisan' then
    insert into public.artisan_profiles (
      id, 
      location, 
      specialization, 
      learning_source, 
      experience_years, 
      bio,
      profile_image_url,
      banner_image_url
    )
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'location', ''),
      coalesce(new.raw_user_meta_data->>'specialization', ''),
      coalesce(new.raw_user_meta_data->>'learning_source', ''),
      coalesce((new.raw_user_meta_data->>'experience_years')::integer, 1),
      coalesce(new.raw_user_meta_data->>'bio', ''),
      '/indian-artisan-smile.png',
      '/indian-textile-workshop.png'
    );
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to automatically create profiles when user confirms email
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after update of email_confirmed_at on auth.users
  for each row when (old.email_confirmed_at is null and new.email_confirmed_at is not null)
  execute procedure public.handle_new_user();
