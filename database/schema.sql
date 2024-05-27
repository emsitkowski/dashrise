-- public."Categories" definition

-- Drop table

-- DROP TABLE public."Categories";

CREATE TABLE public."Categories" (
	id text NOT NULL,
	created_at timestamptz DEFAULT (now() AT TIME ZONE 'cet'::text) NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "Categories_pkey" PRIMARY KEY (name)
);


-- public."Transactions" definition

-- Drop table

-- DROP TABLE public."Transactions";

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


-- public."UserCategories" definition

-- Drop table

-- DROP TABLE public."UserCategories";

CREATE TABLE public."UserCategories" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid DEFAULT auth.uid() NULL,
	"name" text NULL,
	"limitValue" float8 NULL,
	CONSTRAINT "UserCategories_pkey" PRIMARY KEY (id)
);


-- public."Transactions" foreign keys

ALTER TABLE public."Transactions" ADD CONSTRAINT "public_Transactions_category_fkey" FOREIGN KEY (category) REFERENCES public."Categories"("name") ON UPDATE CASCADE;
ALTER TABLE public."Transactions" ADD CONSTRAINT "public_Transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);


-- public."UserCategories" foreign keys

ALTER TABLE public."UserCategories" ADD CONSTRAINT "public_UserCategories_category_name_fkey" FOREIGN KEY ("name") REFERENCES public."Categories"("name") ON UPDATE CASCADE;
ALTER TABLE public."UserCategories" ADD CONSTRAINT "public_UserCategories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);