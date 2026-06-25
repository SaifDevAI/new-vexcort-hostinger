# Cortvex Full Use Case Specifications

This document provides a comprehensive Use Case Specification for the Cortvex application, including detailed Use Case Diagram syntax (Mermaid & PlantUML) and textual specifications for each use case.

---

## 1. Actors Definition

### A. Primary Actors
1. **Anonymous Visitor (Guest)**: Unauthenticated end-user browsing the website.
2. **Authenticated Client (Registered User)**: Logged-in customer seeking services and bookings.
3. **Cortvex Team Member (Admin)**: Agency operators managing bookings and reviewing briefs.

### B. Secondary / Supporting Actors (External Systems)
4. **Supabase Auth Service**: Handles credential verification and session tokens.
5. **Supabase Storage Service**: Hosts files uploaded by users.
6. **Cal.com API**: Handles inline meeting scheduler scheduling and calendar sync.

---

## 2. Visual Use Case Diagram

Here is the full Use Case Diagram represented in **Mermaid.js** syntax:

```mermaid
graph TB
    %% Define Actors
    subgraph Actors [Actors]
        Visitor("👤 Anonymous Visitor")
        Client("👤 Authenticated Client")
        Admin("👥 Cortvex Admin")
        SupabaseAuth("⚙️ Supabase Auth")
        SupabaseStorage("⚙️ Supabase Storage")
        CalCom("⚙️ Cal.com Engine")
    end

    %% Define Use Cases
    subgraph Public_Use_Cases [Public Access Use Cases]
        UC1("UC-1: Browse Services & Portfolio")
        UC2("UC-2: Submit General Inquiry")
        UC3("UC-3: Register Account")
        UC4("UC-4: Log In")
    end

    subgraph Authenticated_Use_Cases [Authenticated Client Use Cases]
        UC5("UC-5: Submit Project Brief")
        UC6("UC-6: Upload Project Document")
        UC7("UC-7: Schedule Call")
        UC8("UC-8: Log Out")
    end

    subgraph Admin_Use_Cases [Admin Operations]
        UC9("UC-9: Review Project Briefs")
        UC10("UC-10: Download Brief Attachments")
        UC11("UC-11: Manage Calendar Sync")
    end

    %% Actor Relationships
    Visitor --> UC1
    Visitor --> UC2
    Visitor --> UC3
    Visitor --> UC4

    %% Client Inherits from Visitor actions implicitly, plus specific ones
    Client --> UC1
    Client --> UC5
    Client --> UC6
    Client --> UC7
    Client --> UC8

    %% Admin Connections
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11

    %% External System Connections
    UC3 --> SupabaseAuth
    UC4 --> SupabaseAuth
    UC5 --> SupabaseAuth
    UC6 --> SupabaseStorage
    UC7 --> CalCom

    %% Use Case Relationships
    UC5 -.-> |"<<include>>"| UC4
    UC6 -.-> |"<<extend>>"| UC5
    UC7 -.-> |"<<include>>"| UC5

    %% Layout and Styling
    style Public_Use_Cases fill:#ffffff,stroke:#333,stroke-width:1px
    style Authenticated_Use_Cases fill:#ffffff,stroke:#333,stroke-width:1px
    style Admin_Use_Cases fill:#ffffff,stroke:#333,stroke-width:1px
```

---

## 3. PlantUML Source Code

If you prefer to render diagrams via PlantUML, you can copy-paste the code below:

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Anonymous Visitor" as visitor
actor "Authenticated Client" as client
actor "Cortvex Admin" as admin

visitor <|-- client

database "Supabase Auth" as auth
database "Supabase Storage" as storage
entity "Cal.com API" as cal

rectangle "Cortvex System" {
  usecase "UC-1: Browse Services & Portfolio" as UC1
  usecase "UC-2: Submit General Inquiry" as UC2
  usecase "UC-3: Register Account" as UC3
  usecase "UC-4: Log In" as UC4
  usecase "UC-5: Submit Project Brief" as UC5
  usecase "UC-6: Upload Project Document" as UC6
  usecase "UC-7: Schedule Call" as UC7
  usecase "UC-8: Log Out" as UC8
  usecase "UC-9: Review Project Briefs" as UC9
  usecase "UC-10: Download Brief Attachments" as UC10
  usecase "UC-11: Manage Calendar Sync" as UC11
}

visitor --> UC1
visitor --> UC2
visitor --> UC3
visitor --> UC4

client --> UC5
client --> UC6
client --> UC7
client --> UC8

admin --> UC9
admin --> UC10
admin --> UC11

UC3 --> auth
UC4 --> auth
UC5 ..> UC4 : <<include>>
UC6 ..> UC5 : <<extend>>
UC7 ..> UC5 : <<include>>
UC6 --> storage
UC7 --> cal
@enduml
```

---

## 4. Use Case Specifications Narratives

Below are specifications for the primary user actions:

### UC-5: Submit Project Brief
- **Actor**: Authenticated Client
- **Description**: Allows authenticated clients to input information regarding their company profile, budget estimation, and desired services checklist.
- **Preconditions**: User must be registered and authenticated (Session active).
- **Postconditions**: Brief is saved in `meeting_bookings` and selected services mapped in `meeting_booking_services`.
- **Main Flow**:
  1. Client navigates to the booking interface `/book-meeting`.
  2. System checks user session via `Supabase Auth`. (If invalid, redirects to Log In).
  3. Client inputs first name, last name, phone, company name, company description, budget range.
  4. Client selects one or more checkboxes corresponding to requested services.
  5. Client clicks "Submit Meeting Brief".
  6. System saves records to the Supabase database.
  7. System renders confirmation alert and proceeds to booking schedule calendar loader (UC-7).

### UC-6: Upload Project Document
- **Actor**: Authenticated Client
- **Description**: Enables users to attach files to support their meeting brief.
- **Preconditions**: Client is currently filling out a Project Brief (UC-5).
- **Postconditions**: Files are uploaded to Supabase Storage, metadata records are logged in `meeting_booking_documents`.
- **Main Flow**:
  1. While filling the brief form, client clicks "Upload documents".
  2. Client selects document files from local filesystem (PDF, DOCX, TXT, etc.).
  3. System validates file duplicates and renders files list.
  4. Client clicks "Submit Meeting Brief".
  5. System uploads files to Supabase Storage Bucket `meeting-docs` under `${user_id}/${booking_id}/`.
  6. System logs file metadata (filepath, size, name) in `meeting_booking_documents`.

### UC-7: Schedule Call
- **Actor**: Authenticated Client, Cal.com API
- **Description**: Integrates the Cal.com scheduling calendar widget to reserve a time slot.
- **Preconditions**: Client has completed the Project Brief submission (UC-5).
- **Postconditions**: Calendar slot reserved on Cal.com and synced to Cortvex operators.
- **Main Flow**:
  1. System loads the Cal.com embed widget inside the `/book-meeting` page.
  2. System pre-populates Client Name and Email inside the scheduler context.
  3. Client selects an available time slot and completes scheduler reservation.
  4. Cal.com syncs invitation emails to client and Cortvex calendar.
