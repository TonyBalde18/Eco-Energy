# Eco Energy Dashboard

A modern web dashboard for real-time monitoring and visualization of energy consumption data using IoT sensors and ThingSpeak.  
Developed for Escola Secundária Campos Melo.

## Features

- **Live Data Visualization:**  
    Displays real-time readings from two energy sensors (Sensor 1 & Sensor 2) using interactive line charts powered by Chart.js.
    
- **Recent Readings Table:**  
    Shows the latest sensor data in a clear, tabular format.
    
- **Daily Averages:**  
    Calculates and displays daily averages for both sensors, including a summary and a 7-day history.
    
- **Responsive Design:**  
    Optimized for desktops, tablets, and mobile devices with a clean, modern UI.
    
- **Custom Branding:**  
    Includes school and project logos, and custom color themes.
    

## Demo

![Eco Energy Dashboard Screenshot](screenshot It Works

- The dashboard fetches sensor data from [ThingSpeak](https://thingspeak.com/) via its REST API.
    
- Data is processed in the browser to display:
    
    - Latest sensor values
        
    - Real-time chart updates
        
    - Tabular view of recent readings
        
    - Daily average calculations for the past week
        

## Project Structure

/
├── index.html         # Main dashboard HTML
├── styles.css         # CSS styles (if separated)
├── script.js          # JavaScript logic (if separated)
├── logocampos.png     # School logo
├── ecoenergy_logo.png # Project logo
├── financiamento.png  # Footer logo
├── images.png         # Footer logo
└── README.md          # Project documentation


## Setup & Usage

1. **Clone or Download the Repository**
    
2. **Configure ThingSpeak Channel**
    
    - Set your ThingSpeak channel ID and API key in the JavaScript section:
        
        js
        
        `const CHANNEL_ID = 'YOUR_CHANNEL_ID'; const API_KEY = 'YOUR_API_KEY';`
        
3. **Add Your Logos**
    
    - Replace the placeholder images (`logocampos.png`, `ecoenergy_logo.png`, etc.) with your actual logos.
        
4. **Open `index.html` in Your Browser**
    
    - The dashboard will automatically fetch and display live data.
        

## Customization

- **Colors & Branding:**  
    Edit the CSS in `<style>` or `styles.css` to match your institution’s branding.
    
- **Number of Sensors:**  
    By default, supports two sensors. To add more, update the JavaScript and HTML tables accordingly.
    
- **API Endpoint:**  
    The dashboard is set up for ThingSpeak. To use another IoT platform, adjust the fetch URL and data parsing logic.
    

## Dependencies

- [Chart.js](https://www.chartjs.org/) (via CDN)
    
- [ThingSpeak API](https://thingspeak.com/docs/)

## Screenshots

![Dashboard Chart Example](chart_example.pngits

- Developed by Alexandre Baldé at **Escola Secundária Campos Melo**
    
- Project logos and images © respective owners

## License

This project is for educational and non-commercial use.  
For other uses, please contact the project maintainers.

## Contact

For questions or suggestions, please contact:  
[info@camposmelo.pt](mailto:info@camposmelo.pt)


