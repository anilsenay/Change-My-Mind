<!-- Template by https://github.com/othneildrew/Best-README-Template -->

<br />
<p align="center">
  <a href="https://github.com/anilsenay/change-my-mind">
    <img src="https://i.ibb.co/7Yhn3wB/change-my-mind-min.png" alt="Header photo" >
  </a>

  <h3 align="center">Change My Mind</h3>

  <p align="center">
    A debate app built with React Native / Expo. Using Firebase as backend.
    <br />
    <br />
    <a href="https://twitter.com/anilsenay">Contact me</a>
    ·
    <a href="https://github.com/anilsenay/change-my-mind/issues">Report Bug</a>
    ·
    <a href="https://github.com/anilsenay/change-my-mind/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Screens](#screens)
   * [Welcome & Login](#welcome---login)
   * [Feed & Explore](#feed---explore)
   * [Discussion](#discussion)
   * [Profile](#profile)
   * [Notifications](#notifications)
   * [Join debate / Start new round / Post argument](#join-debate---start-new-round---post-argument)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Issues / Feature Plans](#issues---future-plans)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project

This was a project I was making with Kotlin but I aborted the project. Then last month I started this project from stratch with React Native this time to learn more and get more experiment in React Native. I wanted to make this project in 1 month as a goal. So everything I've done is a month of labor. ~%90 of my goals are done. After all I have a working project although it has some problems. These problems are not a big deal but I am done with this project now. I will continue to develop this project in places. I used Firebase as backend, I will create my own backend one day if I start development in backend. Because some part of app is not working well because of Firebase's limits. If you like my project and want to cooperate please contact with me ^^

### Built With
* [React Native](https://reactnative.dev/)
* [Expo](https://expo.io/)
* [Firebase](https://firebase.google.com/docs/web/setup)
* [React Navigation](https://reactnavigation.org/)
* [Formik](https://formik.org/docs/overview)
* [date-fns](date-fns.org/)
* [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)
* [react-native-notifier](https://github.com/seniv/react-native-notifier)
* [react-native-collapsible](https://github.com/oblador/react-native-collapsible)

<!-- GETTING STARTED -->
## Screens
### Welcome - Login
![Welcome Image](https://i.ibb.co/2KYQFqQ/welcome-login.png)
- Welcome and login screens are works perfectly.

Demo video: [Click here](https://drive.google.com/file/d/1Kcosp5uze11e0xhZt5tWPl0LJWrHPbSD/view?usp=sharing)

Splash Screen: [Click here](https://drive.google.com/file/d/1KcvfrHQXoFu0QfuEdTfUwP-Pj2NxSHnl/view?usp=sharing) ( animation is not that fast in app actually video is a little fast :D )

### Feed - Explore
![Feed-Explore Image](https://i.ibb.co/w4RwBk4/feed-explore.png)
- Feed screen: needs to be customized according to the user. Sorting is working but category selection is not because of firestore limits.

Demo video: [Click here](https://drive.google.com/file/d/1KsA7Q-_AAeMip_iyzapLDi5RQVHUa2ET/view?usp=sharing)

- Explore screen: This screen is not working well. I will change almost everything on this screen. Page is so slow because of a lot of queries. "Wiew all" is not working for now, I did not create that screen. Only searching is working well. 

### Discussion
![Discussion Image](https://i.ibb.co/K676TS3/discussion.png)
- This page is working well but need tests. I know 1-2 bugs, I will work on them. Share button is not working for now. I need deep linking there.

Demo video: [Click here](https://drive.google.com/file/d/1KohMshxDmxwgFd-W30sEk94v0ijUmnak/view?usp=sharing)

Creating debate demo: [Click here](https://drive.google.com/file/d/1KlGSO5hE4qgzadDrD--cefJys-8d9OUW/view?usp=sharing)

### Join debate - Start new round - Post argument
![Argument Image](https://i.ibb.co/2YKVt48/join.png)
- There are a few bugs/errors sometimes but works well generally.

### Profile
![Profile Image](https://i.ibb.co/KWWwn63/profile.png)
- As I know everything is working well these screens. Need tests of course.
- Message button is not working. Because the app does not have chatting feature yet.

### Notifications

![Notifications Image](https://i.ibb.co/9wr5rDG/Notifications.png)
- Notifications are not working well right now. I will work on them later.

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* expo-cli
```sh
npm install expo-cli --global
```

### Installation

1. You need a firebase configuration file. Contact me to get a test configuration file. Without that config, firebase will not work.
2. Clone the repo
```sh
git clone https://github.com/anilsenay/Change-My-Mind.git
```
3. Install NPM packages
```sh
npm install
```
4. Put your filebase.config.js file to src/consts/

5. Start the expo metro bundler
```sh
npm start
```

<!-- Issues / Future plans -->
## Issues - Future plans

- Notifications / Explore screens will be revised. Especially Explore screen is working with very bad performance.
- Sort / Filter problems (Firestore has max. 10 item limit, so I could not make multi-selection category filtering)
- Profile screen has "Message" button but the app does not have chatting feature. This is a future plan after all.
- Need showing error/success messages after some events. Especially query hooks need better catch functions.
- Discussion and Profile dots modals have "Share" button but Deep Linking is not ready for now. This is a future plan.
- Need tests. 
- Firebase provides more ease but owning backend will be better.
- useEffect cleanup functions must to be added later.

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the GPL License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

[@anilsenay](https://twitter.com/anilsenay)

Project Link: [https://github.com/anilsenay/change-my-mind](https://github.com/anilsenay/change-my-mind)

