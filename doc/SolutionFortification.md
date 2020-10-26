# Five Fifths Voter Technology Summary

## Platform

- Infrastructure

  - IBM Cloud with OpenShift
  - **Benefits**: OpenShift is based on Kubernetes which is a container orchestration platform for scheduling and automating the deployment, management, and scaling of containerized applications.

- Web Application Framework

  - VueJS (UI/UX)
  - **Benefits**: Open source JavaScript framework that is small in size; easy to understand and develop applications; known for its flexibility; good detailed documentation
  - ExpressJS (API Framework)
  - **Benefits**: Lets you structure a web application to handle multiple different http requests at a specific url. Express is a minimal, open source and flexible Node. js web app framework designed to make developing websites, web apps, & API’s much easier.
  - Carbon (UI/UX)(Design System)
  - **Benefits**: Open source design system for products and digital experiences that accelerates design to implementation. With the IBM Design Language as its foundation, the system consists of working code, design tools and resources, human interface guidelines, and a vibrant community of contributors.

- Artificial Intelligence

- [Watson Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/)
  - **Current Project Use**: Supports “Get Social” function.  Based on individual selected by user, analyzes emotions and tones in what that individual write online, like tweets or reviews. 

- [Watson Natural Language Understanding](https://www.ibm.com/cloud/watson-natural-language-understanding)
  - **Current Project Use**: Supports “Get Social” function.  Uses deep learning to extract metadata from text such as entities, keywords, categories, sentiment, emotion, relations, and syntax.

- [Watson Discovery]( https://www.ibm.com/cloud/watson-discovery)  - **Future project capability**: It is AI-powered search technology that uses text analytics and natural language processing to break open data silos and retrieves specific answers to your questions, while also data mining to analyze and relationships buried in enterprise data.
  - **Some Potential Use Cases**
    - Aggregate in-state data sources to create a body of knowledge for each state to determine actionable insights and to improve tailoring of responses to user based on their location
    - Aggregate date sources across states into a United States body of knowledge to determine actionable insights across states.
    - Aggregate data sources regarding candidates to provide the voter with data points as they assess which candidates they will support and vote for
    - Aggregate data for rating of polling locations
    - NOTE: Implementation of these use cases would improve the overall user experience but especially for the “SME” role

## User Experience Goals

- Developer

  - Platform tools are easy to learn, update and maintain

- End Users

  - Provides a tool to assist them with all their voting needs based on the pillars of educate, empower, enable

- Subject Matter Experts
  - Their assessment of the tool determines that for the 
    voter/potential voter it: - Educates them on their right to vote and equips them with the knowledge to participate in elections.

## Data Sources Overview and Needs

The following datasets were used for the initial release of this solution starter kit. Future data integration goals include: Create an API that brings in data for individual states. Explore partnerships with Google, Vote.org, and the Voting Information Project for custom APIs to further enhance the capability of the Five Fifths solution starter kit. 

- [Google Civic Information API](https://developers.google.com/civic-information/)
- [Google Maps API](https://developers.google.com/maps/documentation)
- [Twitter API](https://developer.twitter.com/en/docs/twitter-api)
- [Vote.org Civic engagement tools](https://www.vote.org/technology/)
- [The Voting Information Project](https://www.votinginfoproject.org/)
- [Vote 411 Election Information](https://www.vote411.org/)

  
