# Cortvex Entity Relationship Diagram (ERD)

This document contains the Entity Relationship Diagram (ERD) for the Cortvex database based on the provided Supabase/PostgreSQL schema.

---

## 1. ERD Visualization (Mermaid)

```mermaid
erDiagram
    %% Entities and Attributes
    USERS {
        uuid id PK
        text email UK
    }

    PROFILES {
        uuid id PK, FK
        text email UK
        text full_name
        timestamptz created_at
    }

    SERVICE_CATALOG {
        bigint id PK
        text code UK
        text label
    }

    MEETING_BOOKINGS {
        uuid id PK
        uuid user_id FK
        text company_description
        text status
        timestamptz created_at
        timestamptz updated_at
        text first_name
        text last_name
        text contact_number
        text contact_email
        text company_name
        text price_range
    }

    MEETING_BOOKING_SERVICES {
        uuid booking_id PK, FK
        bigint service_id PK, FK
        timestamptz created_at
    }

    MEETING_BOOKING_DOCUMENTS {
        uuid id PK
        uuid booking_id FK
        uuid user_id FK
        text file_name
        text file_path
        bigint file_size
        text mime_type
        timestamptz created_at
    }

    %% Relationships with simplified text cardinalities on lines
    USERS ||--|| PROFILES : "has profile (1 to 1)"
    USERS ||--o{ MEETING_BOOKINGS : "creates bookings (1 to many)"
    USERS ||--o{ MEETING_BOOKING_DOCUMENTS : "uploads files (1 to many)"
    MEETING_BOOKINGS ||--|{ MEETING_BOOKING_SERVICES : "includes list (1 to many)"
    SERVICE_CATALOG ||--o{ MEETING_BOOKING_SERVICES : "mapped services (1 to many)"
    MEETING_BOOKINGS ||--o{ MEETING_BOOKING_DOCUMENTS : "references files (1 to many)"
```

---

## 2. PlantUML ERD Code

For rendering database relations in PlantUML engines, you can use the code below:

```plantuml
@startuml
skinparam linetype ortho

' Entities
entity "auth.users" as users {
  * id : uuid <<PK>>
  --
  email : text
}

entity "public.profiles" as profiles {
  * id : uuid <<PK>> <<FK>>
  --
  email : text <<unique>>
  full_name : text
  created_at : timestamptz
}

entity "public.service_catalog" as catalog {
  * id : bigint <<PK>>
  --
  code : text <<unique>>
  label : text
}

entity "public.meeting_bookings" as bookings {
  * id : uuid <<PK>>
  --
  * user_id : uuid <<FK>>
  * company_description : text
  * status : text
  * created_at : timestamptz
  * updated_at : timestamptz
  * first_name : text
  * last_name : text
  * contact_number : text
  * contact_email : text
  * company_name : text
  * price_range : text
}

entity "public.meeting_booking_services" as services {
  * booking_id : uuid <<PK>> <<FK>>
  * service_id : bigint <<PK>> <<FK>>
  --
  * created_at : timestamptz
}

entity "public.meeting_booking_documents" as documents {
  * id : uuid <<PK>>
  --
  * booking_id : uuid <<FK>>
  * user_id : uuid <<FK>>
  * file_name : text
  * file_path : text
  file_size : bigint
  mime_type : text
  * created_at : timestamptz
}

' Relationships with explicit labels
users "1" -- "1" profiles : "has profile (1 to 1)"
users "1" -- "many" bookings : "creates bookings (1 to many)"
users "1" -- "many" documents : "uploads files (1 to many)"

bookings "1" -- "many" services : "includes list (1 to many)"
catalog "1" -- "many" services : "mapped services (1 to many)"
bookings "1" -- "many" documents : "references files (1 to many)"

@uml
```

---

## 3. Database Relationships & Constraints Summaries

- **Many to Many (M:N) Relationship**: The conceptual relationship between `meeting_bookings` and `service_catalog` is a **many to many** mapping. This is resolved physically using `meeting_booking_services` as a join table containing foreign keys matching both tables.
- **One to One (1:1) Relationship**: The user `profiles` table maps to the primary authentication table `auth.users` through a shared primary key `id`.
- **One to Many (1:N) Relationship**: A user creates **1 to many** bookings, and a booking references **1 to many** documents.
- **Field Constraints**:
  - `contact_email` enforces an `@` existence pattern matching check constraint.
  - `price_range` enforces enum arrays limits (`<2k`, `2k-5k`, `5k-15k`, `15k-50k`, `50k+`, `not_specified`).
