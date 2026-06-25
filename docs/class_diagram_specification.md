# Cortvex Class Diagram Specifications

This specification maps the Cortvex codebase architecture to a robust, three-tiered UML Class Diagram based on the **Model-View-Controller (MVC) / Entity-Control-Boundary (ECB)** pattern.

---

## 1. Architectural Stereotypes

Consistent with professional UML guidelines (as shown in your reference images), the class ecosystem is divided into:
1. **Boundary Classes (`<<boundary>>`)**: Interfaces that display output to the user and capture user inputs.
2. **Control Classes (`<<control>>`)**: Managers and handlers that drive user verification, file storage uploads, and database writes.
3. **Entity Classes (`<<entity>>`)**: Data models, schemas, and credentials saved persistently in database tables or session states.

---

## 2. Visual Class Diagram (Mermaid)

```mermaid
classDiagram
    %% Base Page Generalization
    class Page {
        <<boundary>>
        +String path
        +render() HTML
    }

    class HomeView {
        <<boundary>>
        -boolean typedHeaderFinished
        +handleHeaderTypewriter()
        +render() HTML
    }

    class SignInView {
        <<boundary>>
        -String emailInput
        -String passwordInput
        -String mode
        +toggleMode()
        +handleSubmit()
    }

    class BookMeetingView {
        <<boundary>>
        -int currentStep
        -string[] selectedServices
        -File[] uploadedFiles
        +handleServiceSelect()
        +handleFileUpload()
        +handleSubmitBrief()
    }

    class ContactView {
        <<boundary>>
        -String nameInput
        -String emailInput
        -String messageInput
        +handleFormSubmit()
    }

    %% Generalizations
    Page <|-- HomeView
    Page <|-- SignInView
    Page <|-- BookMeetingView
    Page <|-- ContactView

    %% Layout Shell Aggregation
    class SiteLayout {
        <<boundary>>
        +renderLayout()
    }
    class Navbar {
        <<boundary>>
        -boolean scrolled
        -boolean mobileOpen
        +handleScroll()
        +toggleMobileMenu()
    }
    class Footer {
        <<boundary>>
        +renderLinks()
    }
    SiteLayout o-- Navbar : Aggregates
    SiteLayout o-- Footer : Aggregates
    SiteLayout o-- Page : Embeds

    %% Control Tier
    class AuthManager {
        <<control>>
        +signUp(email, password) Promise
        +signIn(email, password) Promise
        +signOut() Promise
        +getCurrentSession() Session
    }

    class MeetingManager {
        <<control>>
        +saveBooking(MeetingBooking) Promise
        +linkServices(bookingId, serviceIds) Promise
    }

    class StorageManager {
        <<control>>
        -String bucketName
        +uploadDocument(filePath, fileBlob) Promise
        +deleteDocument(filePath) Promise
    }

    %% Entity Tier
    class AuthUser {
        <<entity>>
        +UUID id
        +String email
        +Timestamp createdAt
    }

    class Session {
        <<entity>>
        +String accessToken
        +AuthUser user
        +int expiresAt
    }

    class MeetingBooking {
        <<entity>>
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
    }

    class BookingDocument {
        <<entity>>
        +UUID id
        +UUID booking_id
        +UUID user_id
        +String file_name
        +String file_path
        +int file_size
        +String mime_type
    }

    class ServiceCatalog {
        <<entity>>
        +int id
        +String code
        +String name
    }

    %% Associations & Dependencies
    SignInView ..> AuthManager : "delegates auth input to"
    BookMeetingView ..> MeetingManager : "delegates form submit to"
    BookMeetingView ..> StorageManager : "delegates files to"

    AuthManager --> Session : "creates / checks"
    Session --> AuthUser : "contains"
    
    MeetingManager --> MeetingBooking : "inserts records"
    MeetingBooking "1" *-- "0..*" BookingDocument : "Composition (docs deleted on booking delete)"
    MeetingBooking "0..*" o-- "1..*" ServiceCatalog : "Aggregation (references services)"
```

---

## 3. PlantUML Source Code

For PlantUML render engines:

```plantuml
@startuml
skinparam style strictuml

package "Boundary Tier (UI Pages)" {
  abstract class Page <<boundary>> {
    + String path
    + render()
  }
  class HomeView <<boundary>> {
    - boolean typedHeaderFinished
    + handleHeaderTypewriter()
  }
  class SignInView <<boundary>> {
    - String emailInput
    - String passwordInput
    - String mode
    + toggleMode()
    + handleSubmit()
  }
  class BookMeetingView <<boundary>> {
    - int currentStep
    - String[] selectedServices
    - File[] uploadedFiles
    + handleServiceSelect()
    + handleFileUpload()
    + handleSubmitBrief()
  }
  class ContactView <<boundary>> {
    - String nameInput
    - String emailInput
    - String messageInput
    + handleFormSubmit()
  }
  class SiteLayout <<boundary>> {
    + renderLayout()
  }
  class Navbar <<boundary>> {
    - boolean scrolled
    - boolean mobileOpen
    + handleScroll()
    + toggleMobileMenu()
  }
  class Footer <<boundary>> {
    + renderLinks()
  }
}

package "Control Tier (Managers)" {
  class AuthManager <<control>> {
    + signUp(email, password)
    + signIn(email, password)
    + signOut()
    + getCurrentSession()
  }
  class MeetingManager <<control>> {
    + saveBooking(booking)
    + linkServices(bookingId, serviceIds)
  }
  class StorageManager <<control>> {
    - String bucketName
    + uploadDocument(filePath, fileBlob)
    + deleteDocument(filePath)
  }
}

package "Entity Tier (Data Models)" {
  class AuthUser <<entity>> {
    + UUID id
    + String email
    + Timestamp createdAt
  }
  class Session <<entity>> {
    + String accessToken
    + AuthUser user
    + int expiresAt
  }
  class MeetingBooking <<entity>> {
    + UUID id
    + UUID user_id
    + String first_name
    + String last_name
    + String contact_number
    + String contact_email
    + String company_name
    + String price_range
    + String company_description
    + String status
  }
  class BookingDocument <<entity>> {
    + UUID id
    + UUID booking_id
    + UUID user_id
    + String file_name
    + String file_path
    + int file_size
    + String mime_type
  }
  class ServiceCatalog <<entity>> {
    + int id
    + String code
    + String name
  }
}

' Generalizations
Page <|-- HomeView
Page <|-- SignInView
Page <|-- BookMeetingView
Page <|-- ContactView

' Aggregations
SiteLayout "1" o-- "1" Navbar
SiteLayout "1" o-- "1" Footer
SiteLayout "1" o-- "1" Page

' View Dependencies on Controls
SignInView ..> AuthManager : delegates login
BookMeetingView ..> MeetingManager : delegates brief saving
BookMeetingView ..> StorageManager : delegates files uploading

' Control and Entity relationships
AuthManager --> Session : checks/creates
Session --> AuthUser : manages
MeetingManager --> MeetingBooking : inserts

' Entity Associations
MeetingBooking "1" *-- "0..*" BookingDocument : Composition
MeetingBooking "0..*" o-- "1..*" ServiceCatalog : Aggregation

@enduml
```
