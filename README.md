![app-icon](https://github.com/emsitkowski/dashrise/assets/40630259/de663c72-c01a-4d3f-a9a4-26a4cf76c5e7)
# dashrise – Nuxt3 + Supabase + Tailwind CSS

![dashrise](https://github.com/emsitkowski/dashrise/assets/40630259/7c2e6ba3-f5eb-4204-a2e3-7d371adf4ba4)

dashrise is a SPA budget planner app built with Nuxt3, Supabase, and Tailwind CSS. It was created for my personal use to keep track of my finances, transactions, and more.

## Key features

- Single-page application with client-side rendering
- Supabase Authentication for user management (email provider)
- Supabase Database for storing user data
- Adding, deleting, and editing transactions
- Budget page for creating budget limits custom user categories
- History page for analyzing all transactions, filtered by selected date
- Smooth loading indicators for better UX
- Custom UI components

## Getting started

### 1. Create your Supabase project at https://supabase.com/ or self-host it yourself.

### 2. Create necessary database tables.
The easiest way is to use SQL Editor in Supabase panel. To set up the required database tables, follow these steps:

1. Open the SQL Editor in the Supabase panel.
2. Paste the following SQL commands.
3. Click "Run" to generate the tables.

```sql
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
	CONSTRAINT "UserCategories_pkey" PRIMARY KEY (id)
);


ALTER TABLE public."Transactions" ADD CONSTRAINT "public_Transactions_category_fkey" FOREIGN KEY (category) REFERENCES public."Categories"("name") ON UPDATE CASCADE;
ALTER TABLE public."Transactions" ADD CONSTRAINT "public_Transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);
ALTER TABLE public."UserCategories" ADD CONSTRAINT "public_UserCategories_category_name_fkey" FOREIGN KEY ("name") REFERENCES public."Categories"("name") ON UPDATE CASCADE;
ALTER TABLE public."UserCategories" ADD CONSTRAINT "public_UserCategories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);
```

### 3. Enable Row Level Security to secure the data.
You read more about RLS here: https://supabase.com/docs/guides/database/postgres/row-level-security

### 4. Install dependencies

```sh
npm install
```

### 5. Run in development mode

```sh
npm run dev
```

### 6. Build for production

```sh
npm run generate
```

### 7. Deploy

Deploy **.output/public** folder to your favorite hosting like Netlify or Vercel.
