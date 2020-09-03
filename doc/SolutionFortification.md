**embRACEtheVOTE Fortification Planning**


# Technology Recommendations

## Platform
- Infrastructure
  - IBM Cloud with OpenShift
  - **Benefits**: OpenShift is based on Kubernetes which is a container orchestration platform for scheduling and automating the deployment, management, and scaling of containerized applications.

- Web Application Framework
  - VueJS (UI/UX)
  - **Benefits**: Open source JavaScript framework that is small in size; easy to understand and develop applications; known for its flexibility; good detailed documentation
  - ExpressJS (API Framework)
  - **Benefits**: Lets you structure a web application to handle multiple different http requests at a specific url. Express is a minimal, open source and flexible Node. js web app framework designed to make developing websites, web apps, & API’s much easier.


- User Experience Expertise
  - Design experience with improving the usability and accessibility, for users with special needs to include Elderly and Disabled
  - Responsive website design



## User Experience Goals

- Developer
  - Platform tools are easy to learn, update and maintain   

- End Users
  - Provides a tool to assist them with all their voting needs based on the pillars of educate, empower, enable

- Subject Matter Experts
  - Their assessment of the tool determines that for the black
voter/potential voter it:
    - Educates them on their right to vote and why they should participate
    - Educates them of the election process
    - Equips them with the knowledge to participate in elections



## Test Plan Overview

- Critical Functions List
    - Verify voter Registration
    - Provides requirements and instructions for how to register to non-registered voters
    - Provide voter's district
    - Provide voter’s district voting schedule
    - Provide voter’s polling Locations
    - Provide requirements/instructions for what voter needs to take to polling location (e.g. ID, etc)
    - Provide location for early voting (Advance Voting Location) and instructions
    - Provide instructions for absentee voting/voting by mail
    - Provide transportation options for travel to polling locations
    - Provide capability to rate polling locations

- User Roles
    - Elderly
    - Disabled
    - Millennial


- Potential external partners to support testing
    - HBCUs
    - Black people based non-profit organizations


## Data Sources Overview and Needs

The following data sources were used for the MVP of this solution.
However, for fortification of this solution, alternative sources need to
be determined with a goal to identify partners that can assist with
creating new APIs to meet the requirement of the solution.

- Data Sources
  - vote.org
    - **Background**: Currently using this site to check registration status, voter registration, absentee ballot requests
    - **Potential Next Steps**: Partner with voter.org on API sharing or development; work with individual states to identify data sources for each state

  - Google Civic API
    - **Background**: MVP was focused on the state of Georgia and this source was used to provide acceptable forms of ID for voting and polling locations
        - **Potential Next Steps**: Create an API that brings in data for individual states. Work with individual states to identify data sources for each state
    
  - Georgia Secretary of State
    - **Background**: MVP was focused on the state of Georgia and this source was used to provide acceptable forms of ID for voting and polling locations
    - **Potential Next Steps**: Create an API that brings in data for individual states. Work with individual states to identify data sources for each state
