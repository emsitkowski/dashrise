CREATE TABLE public."Categories" (
	id text NOT NULL,
	created_at timestamptz DEFAULT (now() AT TIME ZONE 'cet'::text) NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "Categories_pkey" PRIMARY KEY (name)
);

CREATE TABLE public."Transactions" (
	created_at timestamptz DEFAULT (now() AT TIME ZONE 'cet'::text) NOT NULL,
	"type" text NOT NULL,
	category text NULL,
	"name" text NOT NULL,
	value float8 NOT NULL,
	id text NOT NULL,
	user_id uuid DEFAULT auth.uid() NOT NULL,
	"date" text NOT NULL,
	CONSTRAINT "Transactions_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."UserCategories" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid DEFAULT auth.uid() NULL,
	"name" text NULL,
	"limitValue" float8 NULL,
	"note" text NULL,
	CONSTRAINT "UserCategories_pkey" PRIMARY KEY (id)
);


ALTER TABLE public."Transactions" ADD CONSTRAINT "public_Transactions_category_fkey" FOREIGN KEY (category) REFERENCES public."Categories"("name") ON UPDATE CASCADE;
ALTER TABLE public."Transactions" ADD CONSTRAINT "public_Transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);
ALTER TABLE public."UserCategories" ADD CONSTRAINT "public_UserCategories_category_name_fkey" FOREIGN KEY ("name") REFERENCES public."Categories"("name") ON UPDATE CASCADE;
ALTER TABLE public."UserCategories" ADD CONSTRAINT "public_UserCategories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);

ALTER TABLE "Categories" enable row level security;
ALTER TABLE "Transactions" enable row level security;
ALTER TABLE "UserCategories" enable row level security;

CREATE POLICY "Enable ALL actions for authenticated users based on user_id"
on "public"."Transactions"
to authenticated
using (
(auth.uid() = user_id )
);

CREATE POLICY "Enable ALL actions for authenticated users based on user_id"
on "public"."UserCategories"
to authenticated
using (
(auth.uid() = user_id )
);

CREATE POLICY "Enable INSERT actions for authenticated users based on user_id"
on "public"."Categories"
for INSERT
to authenticated
with check (true);

CREATE POLICY "Enable SELECT actions for authenticated users"
on "public"."Categories"
for SELECT
to authenticated
using (true);