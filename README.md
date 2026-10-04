# COVID-19 Dashboard

## Description

The COVID-19 Dashboard is an interactive web application that allows users to track and analyze data related to the COVID-19 pandemic. The application provides global statistics, historical data regarding the pandemic, and detailed information about individual countries. With the use of charts, users can easily visualize trends in cases, deaths, and recoveries.

## Features

- **Global Data**: Displays current global statistics regarding COVID-19.
- **Historical Data**: Visualizes trends using line charts for cases, deaths, and recoveries worldwide.
- **Country List**: Overview of COVID-19 data for individual countries, with sorting and filtering options.
- **Country Details**: Displays detailed COVID-19 data for the selected country, including charts.
- **Charts**: Visualizes data in the form of line charts for better understanding of trends.

## Technologies

- **Next.js**: A React framework that provides server-side rendering.
- **React**: Version 19.
- **Chart.js**: A charting library used for visualizing data.
- **Fetch API**: The built-in JavaScript API for making HTTP requests to external APIs.
- **Bulma**: A modern CSS framework for styling the application.

## Used API

The application utilizes an external API available at [disease.sh](https://disease.sh/) to fetch current and historical data regarding COVID-19. This API provides access to reliable information about the pandemic from around the world.

## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DLQuake/covid19-dashboard.git
   cd covid19-dashboard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   Node.js 20.9 or newer is required by Next.js 16.

3. **Run the application**:

   ```bash
   npm run dev
   ```

   Run `npm run lint` to check the code and `npm run build` to create a production build.

4. **Open your browser and go to** `http://localhost:3000`.

## Usage

The application is available in a responsive mode, making it convenient to use on both computers and mobile devices. Users can search for country data and view COVID-19 details for each country.