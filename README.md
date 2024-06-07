![app-icon](https://github.com/emsitkowski/dashrise/assets/40630259/de663c72-c01a-4d3f-a9a4-26a4cf76c5e7)

# dashrise – Nuxt3 + Supabase + Tailwind CSS

![localhost_3000_](https://github.com/emsitkowski/dashrise/assets/40630259/96ba079d-d980-4e60-be3b-64ea219fdf55)


dashrise is a budget planner app built with Nuxt3, Supabase, and Tailwind CSS. It was created for my personal use to keep track of my finances, transactions, and more.

## Key features

- Single-page application with client-side rendering
- PWA integration that allows installing the app as native-like
- Supabase Authentication for user management (email provider)
- Supabase Database for storing user data
- Adding, deleting, and editing transactions
- Home page for current month summary
- Budget page for creating budget limits for custom user categories
- History page for analyzing all transactions, filtered by selected date
- Smooth loading indicators for better UX
- Custom UI components

## How to use it

### Change currency
You can globally change the currency symbol throughout the app in the **utils/currency.ts** file – just replace the symbol inside **convertToCurrency** function.

### Homepage

On the main page, you get a quick glance at your financial situation for the current month. It shows your total balance, income, recent transactions, and expenses grouped by categories. From this view, you can also add new transactions, and edit or delete existing ones. The homepage dashboard data resets automatically each month, but you can find all your transactions in the History tab.

### Budget

This page is where you plan your finances. You can add as many budget items as you wish, setting a plan or limit for each one. The limits you set will also be displayed on the homepage in the expenses widget. You can adjust the limits each month, and each budget card will show your progress for the current month. You can also take a short note for each category. If you want to preserve some items for future months, you can set the limit to 0. This way, you won't have to remember to add them again, and you can simply update the limit to the desired value when needed.

### History

In the History tab, you can explore your past transactions by selecting a specific year and month. This view allows you to see all your transactions for the chosen period and provides a summary of total expenses, sorted by categories in descending order of value. This feature helps you review your spending habits and make informed financial decisions based on your historical data.

## Getting started

### 1. Supabase: Create your Supabase project at https://supabase.com/ or self-host it yourself.

### 2. Supabase: Create necessary database tables with foreign keys.

The easiest way is to use SQL Editor in Supabase panel. To set up the required database tables, follow these steps:

1. Open the SQL Editor in the Supabase panel.
2. Paste the following SQL commands.
3. Click "Run" to generate the tables.
4. Newly created tables should appear in Table Editor tab.

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
	"note" text NULL,
	CONSTRAINT "UserCategories_pkey" PRIMARY KEY (id)
);


ALTER TABLE public."Transactions" ADD CONSTRAINT "public_Transactions_category_fkey" FOREIGN KEY (category) REFERENCES public."Categories"("name") ON UPDATE CASCADE;
ALTER TABLE public."Transactions" ADD CONSTRAINT "public_Transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);
ALTER TABLE public."UserCategories" ADD CONSTRAINT "public_UserCategories_category_name_fkey" FOREIGN KEY ("name") REFERENCES public."Categories"("name") ON UPDATE CASCADE;
ALTER TABLE public."UserCategories" ADD CONSTRAINT "public_UserCategories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);
```

### ⚠️ 3. Supabase: Enable Row Level Security to secure the data and prevent users from accessing other users' data.

You read more about RLS here: https://supabase.com/docs/guides/database/postgres/row-level-security

To create basic RLS policies use SQL Editor and paste the following commands:

```sql
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
```

### 4. Create .env file in your project directory containing your Supabase secrets.

You can find unique URL and KEY in your Supabase panel, **Project Settings –> API**

```
SUPABASE_URL="<YOUR_SUPABASE_URL>"
SUPABASE_KEY="<YOUR_SUPABASE_KEY>"
```

### 5. Install dependencies

```sh
npm install
```

### 6. Run in development mode

```sh
npm run dev
```

### 7. Build for production

```sh
npm run generate
```

### 8. Deploy

Deploy **.output/public** folder to your favorite hosting like Netlify or Vercel.
