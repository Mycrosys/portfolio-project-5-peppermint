<h1 align="center"><a name="top">Project Peppermint</a></h1>

[View the live project here.](https://peppermint-qa.herokuapp.com/)

Project Peppermint is a Website that allows you to create Issues (also commonly referred to as Bug reports) and share them with other people. Authenticated users can create issues, update, and delete them. All Information is saved on an external API, which also tracks any modifications down to Events via its Journal model. 

Users can Browse and Search all Issues on the site and follow them, to more easily be updated on any changes to them. In addition, there is a box with the recent updated Issues that lets them easily see which issues were created/updated last and how many updates it has.

Contrary to my other Projects, this website is meant as an Intranet application, because of the nature of the shared information.

<h2 align="center"><img src="./docs/images/peppermint_website.jpg" alt="Project Peppermint on multiple Devices"></h2>

<br>

## <a name="tableofcontents">Table of Contents</a>

### I. [User Experience (UX)](#userxp)
-   [Five Planes of UXD](#fiveplanes)
-   [Design](#design)
-   [User Stories](#userstories)
-   [Agile Methodology](#agile)
-   [Wireframes](#wireframes)

### II. [The Model](#databasemodel)

### III. [Features](#features)

### IV. [Technologies Used](#technology)

### V. [Testing](#testing)

### VI. [Future Features](#future)

### VII. [Deployment](#deployment)

### VIII. [Credits](#credits)

<br><br>


## ([^](#tableofcontents)) <a name="userxp">User Experience (UX)</a>

## <a name="userxp">User Experience (UX)]</a>

*   ### <a name="fiveplanes">Five Planes of UXD</a>
    -   #### Strategy Plane
        1. I've been working as a Customer Support Agent for 16 years and during that time I have come across a couple of different bug report/management systems. Most of them are overly complicated to use, so I wanted to create one that is more intuitive but still retains most of the functionality.
        2. Many companies do not need the bigger QA systems that are used with hundreds of features. A smaller lightweight application that is more fit for their needs will match their infrastructure better and reduce additional costs.
        3. Split between Frontend and Backend: By using an API, features can be implemented on the Backend and tested, without affecting Frontend functionality. This also makes it easier to split the development into different Teams, e.g. a Frontend and a Backend Team.
        4. Expandability: React is highly modular and can be easily expanded. If there is any need for more Features in the Future, they can be implemented without affecting the other components of the application. This also creates a situation where Teams working on the Frontend can be split further, each working on different components.
 
    -   #### Scope Plane
        1. The Site covers Authentication and CRUD around the Issues.
        2. Being logged in immediately is visible with the Username and a Profile Picture being displayed in the NavBar.
        3. The Page 'My Issues' is there to keep track of Issues created by the User as well as have easy access to deleting or modifying them.
        4. The Page 'Followed' is there to keep track of Issues being followed by the User.
        5. The Searchbar is there to easily filter Issues on the Home, My Issues, and Followed Pages.
        6. Recently Updated Issues are shown in a Sidebar to easily access hot Issues.

    -   #### Structure Plane
        1. The Structure of the Site is simple and mostly linear. Progressing is mostly done with just the click of a Button unless form Inputs are required. The site visitor can always click on the navbar Elements to quickly find or create Issues when logged in.
        2. There is a clear indication on the Navbar when you are on one of it mentioned Pages. The only exceptions are 'detail' and 'edit' Issue/Profile pages because these require a specific ID. However, these are straightforward and the site visitor can return to the normal navigation simply by clicking on one of the navbar elements.
    
    -   #### Skeleton Plane
        1. The [Wireframes](#wireframes) can be found further down in this Document.
        2. The Home Page is presented with a list of Issues, sorted by creation date.
        3. Issues are implemented as Cards throughout the whole page, being introduced on the Home Page and then followed up in My Issues and Followed.
        4. Forms are used for creating and modifying Issues, Login and Register, as well as editing the User Profile.
        5. On mobile devices, the amount of content displayed next to each other changes to give users the chance to use the page with 100% functionality on these devices as well. The content is then ordered in a way he would normally consume the content on a Desktop Browser as well, to not cause confusion and keep it well structured. This is achieved by using Bootstrap 5.

    -   #### Surface Plane
        1. Fontawesome was used for the navbar and Dropdownmenues Anchor (Pen Symbol). Comparable Icons are used on other sites so this should feel familiar to the visitor.
        2. Further details like Font/Color choice, etc. can be found in the next separate Section: [Design](#design).

<br>

*   ### <a name="design">Design</a>
  
    -   #### Colour Scheme
        -   I choose a greenish color palette to match the leaf and keep the theme of "Peppermint". The Palette can be found [here](https://coolors.co/ffffff-008542-c5dbc2-cc2222-bec9c9-677979-000000).
        -   The Font Color used is Black (#000000) on White (#FFFFFF), for maximum readability.
        -   For the navbar, Icons are shown in Silver Sand (#BEC9C9) to better show the contrast of the highlight Spanish Green (#008542).
        -   To keep WCAG compliancy, all links are shown in Nickel(#677979), except for the Register and Login links on their respective Pages. These are shown in Lava (#CC2222), to highlight them as options if players went to the login page but want to register or vice versa. The same color is also used for highlighting Overdue Issues.
        -   The Background below the Navbar is painted in the final color, Cambridge Blue (#C5DBC2), which is a light shade of green.
    
    <br>
    <h2><img src="./docs/images/palette.jpg" alt="A Picture of the color Palette used on the website"></h2><br>

    -   #### Typography
        -   The Oswald font is used as the main font for the whole website with a sans-serif as a backup font in case the font doesn't import correctly.
        -   To complement this, Merriweather is used as the header/title font in most components. Its main purpose is to support the site's theme. The backup font is sans-serif as well.
  
    -   #### Imagery
        -   A green leaf (representing a Peppermint Leaf) is shown on the top left of the NavBar. It is also used as a Favicon for the Page.
        -   Every Issue requires a screenshot/image for creation. These are resized to fit into the Issue Card.
        -   Users have the option to include a profile Picture which is then displayed as a circle on both their Profile Page and in the NavBar.

  
<br>

*   ### <a name="userstories">User stories</a>

    1. As a Site User, I can register an account so that I can create/join and view details of events.
    2. As a registered Site User, I can log in and log out so that I can use the main features of the Site while seeing my logged-in Username.
    3. As a registered Site User, I can create my events so that I can share them with other site users.
    4. As a registered Site User, and Event Creator I can delete my existing events so that I can remove them from the website.
    5. As a registered Site User, and Event Creator I can edit/modify my existing events so that I can update their information.
    6. As a registered Site User, I can view and browse Events so that I can find out more information about them.
    7. As a registered Site User, I can join events so that I can show that I will attend these.
    8. As a registered Site User, I can leave events I have joined before so that I can show that I will no longer attend said event.
    9. As a registered Site User, I can search for events so that I can find events I want to join.
    10. As a registered Site User, I can quickly and easily distinguish Events I have created or joined in a list so that I can more easily find new events I am not involved with yet.
    11. As a registered Site user, I can see Feedback Messages about my Actions so that I receive a visual confirmation, that my action was successful.

<br>

*   ### <a name="agile">Agile Methodology</a>

    - The Development of this project was managed using GitHub Projects.
        1. [The Project](https://github.com/users/Mycrosys/projects/2/views/1?layout=board)
        2. Epics: NAVIGATION, AUTHENTICATION, ISSUES, PROFILES
        3. User Stories: Please see above for [User Stories](#userstories).
    - Each Epic has the related User Stories written in its description. User Stories have their acceptance criteria written in their description.
    - For Epics to be marked as "done", each (non-optional) User Story needs to be finished as well.

<br>

*   ### <a name="wireframes">Wireframes</a>
    -   Index Page Wireframe 1
        <h2><img src="./docs/images/wireframe_index1.png" alt="Wireframe one of three for the first page the user is seeing when accessing the page on desktop devices"></h2><br>
    -   Index Page Wireframe 2
        <h2><img src="./docs/images/wireframe_index2.png" alt="Wireframe two of three for the first page the user is seeing when accessing the page on desktop devices"></h2><br>
    -   Index Page Wireframe 3
        <h2><img src="./docs/images/wireframe_index3.png" alt="Wireframe two of three for the first page the user is seeing when accessing the page on desktop devices"></h2><br>
    -   Register Account Wireframe
        <h2><img src="./docs/images/wireframe_sign_up.png" alt="Wireframe of the Sign up Page on desktop devices"></h2><br>
    -   Sign In Wireframe
        <h2><img src="./docs/images/wireframe_sign_in.png" alt="Wireframe of the Sign in Page on desktop devices"></h2><br>
    -   Sign Out Wireframe
        <h2><img src="./docs/images/wireframe_sign_out.png" alt="Wireframe of the Sign Out Page on desktop devices"></h2><br>
    -   My Events Wireframe
        <h2><img src="./docs/images/wireframe_my_events.png" alt="Wireframe of the My Events Page on desktop devices"></h2><br>
    -   My Events Wireframe Mobile
        <h2><img src="./docs/images/wireframe_my_events_mobile.png" alt="Wireframe of the My Events Page on mobile devices"></h2><br>
    -   Delete Confirmation in My Events Wireframe
        <h2><img src="./docs/images/wireframe_delete_confirm.png" alt="Wireframe of the Delete Confirmation on the My Events Page on desktop devices"></h2><br>
    -   Create Event Wireframe
        <h2><img src="./docs/images/wireframe_create_event.png" alt="Wireframe of the Create Event Page on desktop devices"></h2><br>
    -   Browse Event Wireframe
        <h2><img src="./docs/images/wireframe_browse_events.png" alt="Wireframe of the Browse Event Page on desktop devices"></h2><br>
    
<br><br>


## ([^](#tableofcontents)) <a name="databasemodel">The Event Database Model</a>

<h2><img src="./docs/images/database_model.jpg" alt="A Picture of the Database Model used in the Project"></h2><br>

- Dj-rest-auth handles all Authentication Issues (User Model).
- The Issue Model contains all relevant information about an issue.
- Journals are used to store the history of an Issue. They contain which fields were changed and when.
- Profile holds expanded User Information like the Bio and Profile Picture.
- Following is used to keep track of which User is following which Issue.
- The implementation is done via an API. More Information and Details of the Models can be found in the README.MD of that Project: [QA API](https://github.com/Mycrosys/qa-api).

<br><br>

## ([^](#tableofcontents)) <a name="features">Features</a>

###   Authentication

- Allauth handles all Authentication on the Website. Most of the Pages (details, my events, create/modify events, browse) require the User to be authenticated to work. If the User is not Authenticated, many elements of the Website aren't available, e.g. the Navbar does not even show some Pages, to begin with. If a User however uses a valid link to enter one of these pages, he will be met with a message telling him that he needs to be logged in and redirected to the home page a couple of seconds later. On the other side, if a user is authenticated, other elements are not shown. For example, neither the Login nor Register button is available, but instead, a logout option, as well as the username, is displayed. Likewise, the signup button on the bottom of the index page vanishes, if the user is logged in.

The Navbar with a logged-in User.
<h2><img src="./docs/images/navbar_logged_in.jpg" alt="A Picture of the Website showing the message that you need to be logged in to view that Page"></h2><br>
The message tells you to log in or register.
<h2><img src="./docs/images/not_logged_in.jpg" alt="A Picture of the Website showing the message that you need to be logged in to view that Page"></h2><br>

###   Color Coded display of Events, Information Icons

- Events are shown as Cards on the Website, with their Category having a unique background color to make it immediately recognizable which kind of Event the Site User is looking at. In addition, as a logged-in User, these cards do contain symbols showing if you are the creator of the event (A Calendar Icon will appear) or have confirmed your attendance for that Event already (A checkmark Icon will be shown). Both are implemented via Fontawesome.

<h2><img src="./docs/images/cards.jpg" alt="A Picture of the Events displayed as Cards on the Page"></h2><br>

###   Event Creation/Modification and Deletion

- Registered Site Users can create their own events as well as modify or delete them. For easier access to created events, my events page exists, showing all events that the user created and have not already taken place (expired events are not shown anywhere on the page). In case of a deletion of an Event, a confirmation modal is being shown that asks for confirmation. Deleting an Event has non-reversible repercussions because while you may be able to create the event again, all attendees need to join that new event again by themselves. If you want your Event to keep its attendees, modifying instead of deleting and recreating it is recommended.

<h2><img src="./docs/images/delete_confirm_modal.jpg" alt="A Picture of a Modal asking to confirm the deletion of an event"></h2><br>

- Event Creation and Modification are limited to give people time to adjust to attend or adjust to the changes. An event needs to be created at least 12 hours before it is taking place. The same holds true if you want to modify an event. In case the starting time is closer than 12 hours, you will be prompted to update the Location Time when modifying your event.

<h2><img src="./docs/images/time_limit_form.jpg" alt="A Picture of a Form Feedback Message that the Event needs to start at a later date"></h2><br>

###   Joining or Leaving Events and tracking of Attendees

- Registered Site Users are able to show their attendance by joining an Event. They can also leave it at any time, with no restrictions set in place. At this time, their name will not be visible to anyone except the admin in the admin panel for privacy reasons. This may change in future iterations of the project to give more control to the Event creator to manage the attendees.

- Event Creators can not join or leave their created events. Their attendance is required and they are added as an attendee upon creation of the event. In order for them to leave their event, they will need to delete it completely. This is so Event Creators take ownership of their events and not create them and let attendees handle everything around them.

<h2><img src="./docs/images/my_events.jpg" alt="A Picture of the my events page showing created and joined events"></h2><br>

###   Visual Feedback to User Actions

- The Site gives Users visual Feedback on where they are and if their mouse is over a link that will cause an action like submitting a form, resetting it, filtering events, or changing the site they currently are on. In addition, actions like logging in, logging out, deleting/modifying an event or joining, or leaving it, will create a feedback message that will be shown for a couple of seconds on top of the screen.

Hovering over the Delete Button with the mouse.<br>
<h2><img src="./docs/images/hovering_button.jpg" alt="A Picture of a car on the my events page hovering over the delete button"></h2><br>
Hovering over the Browse Navbar Link with the mouse while on the My Events Page.<br>
<h2><img src="./docs/images/hovering_navbar.jpg" alt="A Picture of the navbar the my events page, hovering over browse"></h2><br>
Confirmation message after modifying an event.<br>
<h2><img src="./docs/images/messages.jpg" alt="A Picture of the my events page showing a confirmation message for modifying an event"></h2><br>
<br>

## ([^](#tableofcontents)) <a name="technology">Technologies Used</a>

### Languages Used

-   [HTML 5](https://en.wikipedia.org/wiki/HTML/)
-   [CSS 3](https://en.wikipedia.org/wiki/CSS)
-   [JavaScript](https://de.wikipedia.org/wiki/JavaScript)
-   [Python](https://en.wikipedia.org/wiki/Python_(programming_language))
-   [Django](https://de.wikipedia.org/wiki/Django_(Framework))

### Django Packages Used

1. [Dj_database_url](https://pypi.org/project/dj-database-url/)
    - For parsing the URL from env.py
1. [Psycopg2](https://pypi.org/project/psycopg2/)
    - As a PostgreSQL database adapter for the Python
1. [Gunicorn](https://gunicorn.org/)
    - As the Heroku Server
1. [Allauth](https://django-allauth.readthedocs.io/en/latest/installation.html)
    - For Authentication (Signup, Login, Logout)
1. [Summernote](https://summernote.org/)
    - For the Filtering and WYSIWYG Editor in the Admin Panel
1. [Cloudinary](https://cloudinary.com/)
    - As a host for static and media files
1. [Crispy Forms](https://django-crispy-forms.readthedocs.io/en/latest/)
    - For styling login, register, create an event, modify an event and browse filter forms
1. [Crispy Bootstrap5](https://github.com/django-crispy-forms/crispy-bootstrap5)
    - To make Crispy Forms work together with Bootstrap 5
1. [Coverage](https://pypi.org/project/coverage/)
    - To generate a report of the code coverage of automatic tests


### Frameworks, Libraries & Programs Used

1. [Code Institute Basic Template:](https://github.com/Code-Institute-Org/gitpod-full-template)
    - This Template was used as a requirement for this Project.
1. [Git](https://git-scm.com/)
    - Git was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub.
1. [GitHub:](https://github.com/)
    - GitHub is used to store the project's code after being pushed from Git.
1. [Google Fonts:](https://fonts.google.com/)
    - Google fonts were used to import the 'Aleo' and 'Arimo' fonts into the style.css file.
1. [Font Awesome:](https://fontawesome.com/)
    - Font Awesome was used to add icons for aesthetic and UX purposes.
1. [Bootstrap](https://getbootstrap.com/)
    - Used to make the Website responsive and style it.
1. [Jquery](https://jquery.com/)
    - To help with Javascript
1. [Heroku](https://www.heroku.com/)
    - For deployment of the Project
1. [PostgreSQL](https://www.postgresql.org/)
    - As the Database used for the project.
1. [Balsamiq](https://balsamiq.com/)
    - Balsamiq was used to create [Wireframes](#wireframes) for the project.
1. [Gimp:](https://www.gimp.org/)
    - Gimp was used to create, modify and resize all images on this website.
1. [Favicon Generator](https://favicon.io/favicon-generator/)
    - Favicon Generator was used to create the Favicon for the project.
1. [W3C - HTML](https://validator.w3.org/)
    - For validating the HTML code
1. [W3C - CSS](https://jigsaw.w3.org/css-validator/)
    - For validating the CSS Code
1. [JSHINT - JS](https://jshint.com/)
    - For validating the JS Code
1. [PEP8](http://pep8online.com/)
    - For validating the Python code
1. [a11y](https://color.a11y.com/Contrast/)
    - For validating the contrast of colors used on the Website

<br>