require('dotenv').config();
const mqtt = require('mqtt');

// MQTT connection settings
const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://localhost:1883';
const APPLICATION_ID = process.env.APPLICATION_ID || '1'; // Default ChirpStack app ID

// Simulated devices - replace with your actual device EUIs
const DEVICES = [
  { devEui: '1234567890ABCDEF', name: 'Temperature Sensor 1' },
  { devEui: 'ABCDEF1234567890', name: 'Humidity Sensor 1' },
  { devEui: '1111111111111111', name: 'GPS Tracker 1' },
];

// Connect to MQTT broker
const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  startSimulation();
});

client.on('error', (error) => {
  console.error('MQTT connection error:', error);
});

function generatePayload(device) {
  // Simulate different types of sensor data
  const basePayload = {
    devEui: device.devEui,
    timestamp: new Date().toISOString(),
  };

  if (device.name.includes('Temperature')) {
    return {
      ...basePayload,
      temperature: 20 + (Math.random() * 15 - 5), // 15-35°C
      battery: 80 + (Math.random() * 20), // 80-100%
    };
  }

  if (device.name.includes('Humidity')) {
    return {
      ...basePayload,
      humidity: 40 + (Math.random() * 40), // 40-80%
      battery: 75 + (Math.random() * 25), // 75-100%
    };
  }

  if (device.name.includes('GPS')) {
    return {
      ...basePayload,
      latitude: 52.3676 + (Math.random() * 0.1 - 0.05), // Berlin area ±0.05
      longitude: 4.9041 + (Math.random() * 0.1 - 0.05), // Amsterdam area ±0.05
      battery: 90 + (Math.random() * 10), // 90-100%
    };
  }

  return basePayload;
}

function startSimulation() {
  console.log('Starting device simulation...');
  
  DEVICES.forEach((device) => {
    // Send data every 30 seconds for each device
    setInterval(() => {
      const payload = generatePayload(device);
      const topic = `application/${APPLICATION_ID}/device/${device.devEui}/event/up`;
      
      client.publish(topic, JSON.stringify(payload), (error) => {
        if (error) {
          console.error(`Failed to publish message for device ${device.devEui}:`, error);
        } else {
          console.log(`Message sent for ${device.name}:`, payload);
        }
      });
    }, 30000); // 30 seconds

    console.log(`Device ${device.name} (${device.devEui}) will send data every 30 seconds`);
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down simulator...');
  client.end();
  process.exit(0);
});