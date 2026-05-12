alter table public.leads
  add column if not exists lead_score integer,
  add column if not exists source text;

update public.leads
set status = 'new'
where status is null
   or status not in ('new', 'contacted', 'booked', 'closed');

update public.leads
set lead_score = 0
where lead_score is null;

update public.leads
set source = 'website'
where source is null;

alter table public.leads
  alter column status set default 'new',
  alter column status set not null,
  alter column lead_score set default 0,
  alter column lead_score set not null,
  alter column source set default 'website',
  alter column source set not null;

alter table public.leads
  drop constraint if exists leads_status_check,
  drop constraint if exists leads_status_valid,
  add constraint leads_status_valid
    check (status in ('new', 'contacted', 'booked', 'closed'));

alter table public.leads
  drop constraint if exists leads_score_range,
  add constraint leads_score_range
    check (lead_score between 0 and 100);
