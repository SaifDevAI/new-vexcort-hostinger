# Cortvex UML & Use Case Architecture

This document defines the **User Classes** (roles), the **UML Class Diagram** (domain models and database structure), and the **Use Case Diagram** (interactions) for the Cortvex application.

---

## 1. User Classes (Actors)

There are three primary user classes interacting with the Cortvex platform:

### A. Anonymous Visitor (Guest)
- **Description**: Public website visitors browsing the portfolio, services, or contact details.
- **Capabilities**:
  - View public agency content (Home, Services, Process, Work, Blog, FAQ).
  - Submit general messages or queries via the contact form.
  - Access login/registration forms to transition to a registered user.

### B. Authenticated Client (Registered User)
- **Description**: Clients who have created an account to book strategy consultations and submit product briefs.
- **Capabilities**:
  - Inherits all Guest privileges.
  - Submit detailed, structured meeting briefs (defining company, budget range, and selected services).
  - Upload supporting project documentation (PDFs, templates, pitch decks) securely to Supabase Storage.
  - Access the inline Cal.com booking scheduler.

### C. Cortvex Team Member (Admin / Developer)
- **Description**: Agency operators (Saif, Hassan, Umer, etc.) who review prospects and run meetings.
- **Capabilities**:
  - Access the Supabase Studio dashboard to review incoming `meeting_bookings`.
  - Download and inspect files in the `meeting-docs` storage bucket.
  - Manage scheduled calendar events on the Cal.com dashboard.

---

## 2. Use Case Diagram

The use case diagram outlines how the actors interact with the system boundary (Cortvex App + Supabase + Cal.com).

```mermaid
graph TD
    %% Define Actors
    Visitor("👤 Anonymous Visitor")
    Client("👤 Authenticated Client")
    Admin("👥 Cortvex Team (Admin)")

    %% System Boundary
    subgraph System ["Cortvex System Boundary"]
        UC_Browse("Browse public agency content")
        UC_Inquiry("Submit general inquiry")
        UC_Auth("Sign Up / Log In")
        UC_SubmitBrief("Submit Project Brief")
        UC_Upload("Upload Supporting Documents")
        UC_Cal("Schedule Meeting (Cal.com)")
        UC_ReviewBriefs("Review Client Briefs")
        UC_DownloadDocs("Download Client Documents")
    end

    %% Visitor Actions
    Visitor --> UC_Browse
    Visitor --> UC_Inquiry
    Visitor --> UC_Auth

    %% Client inherits/extends and has specific actions
    Client --> UC_Browse
    Client --> UC_SubmitBrief
    Client --> UC_Upload
    Client --> UC_Cal

    %% Admin Actions
    Admin --> UC_ReviewBriefs
    Admin --> UC_DownloadDocs
    Admin --> UC_Cal

    %% Relationships inside the boundary
    UC_SubmitBrief -.-> |"<<include>>"| UC_Auth
    UC_Upload -.-> |"<<extend>>"| UC_SubmitBrief
    UC_Cal -.-> |"<<include>>"| UC_SubmitBrief

    %% Style nodes
    style System fill:#F0FDFF,stroke:#1800AD,stroke-width:2px
    style Visitor fill:#fff,stroke:#333,stroke-width:1px
    style Client fill:#fff,stroke:#333,stroke-width:1px
    style Admin fill:#fff,stroke:#333,stroke-width:1px
```

---

## 3. Domain Class Diagram

This diagram displays the structural classes, database models, and their relationships. It represents the objects parsed by the front-end (using Supabase JS schema representations) and their mappings in the database.

```mermaid
classDiagram
    direction LR

    class AuthUser {
        +UUID id
        +String email
        +signUp(email, password)
        +signIn(email, password)
        +signOut()
    }

    class Session {
        +String accessToken
        +AuthUser user
        +isActive() Boolean
    }

    class MeetingBooking {
        +UUID id
        +UUID user_id
        +String first_name
        +String last_name
        +String contact_number
        +String contact_email
        +String company_name
        +String price_range
        +String company_description
        +String status
        +Timestamp created_at
        +submitBrief() Promise
    }

    class BookingDocument {
        +UUID id
        +UUID booking_id
        +UUID user_id
        +String file_name
        +String file_path
        +Int file_size
        +String mime_type
        +Timestamp created_at
        +uploadToStorage(file) Promise
        +saveRecord() Promise
    }

    class ServiceCatalog {
        +Int id
        +String code
        +String name
        +fetchCatalog() Array
    }

    class MeetingBookingService {
        +UUID booking_id
        +Int service_id
    }

    %% Relationships
    AuthUser "1" --> "0..*" MeetingBooking : "creates"
    AuthUser "1" --> "0..*" BookingDocument : "owns"
    Session "1" --> "1" AuthUser : "contains"
    
    MeetingBooking "1" *-- "0..*" BookingDocument : "contains"
    MeetingBooking "1" -- "0..*" MeetingBookingService : "maps"
    ServiceCatalog "1" -- "0..*" MeetingBookingService : "maps"
```

### Class Attributes & Methods Details:
1. **`AuthUser`**: Maps to Supabase Auth (`supabase.auth`). Manages credential actions.
2. **`Session`**: Front-end session manager checking if a user has access tokens. Used by route guards.
3. **`MeetingBooking`**: The client profile brief submitted before booking. Represents the database table `meeting_bookings`.
4. **`BookingDocument`**: Manages document files uploaded by the client. Links physical files in Supabase Storage (`meeting-docs` bucket) to metadata database logs (`meeting_booking_documents` table).
5. **`ServiceCatalog`**: Holds static listings of offered services (e.g., `web_development`, `ai_automation`) mapped from `service_catalog`.
6. **`MeetingBookingService`**: Join table matching selected services to bookings, mapping to `meeting_booking_services` table.
