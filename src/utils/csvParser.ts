export interface CSVPropertyData {
  id: string;
  title: string;
  description: string;
  price: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  country: string;
  city: string;
  sold?: string;
}

export const parseCSV = (file: File): Promise<CSVPropertyData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        if (lines.length < 2) return resolve([]);

        // Use robust CSV line parser for headers and rows
        const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
        const required = [
          "id", "title", "description", "price", "type", "bedrooms", "bathrooms", "area", "country", "city"
        ];

        // Log headers and first data row for debugging
        console.log("Parsed headers:", headers);
        if (lines.length > 1) {
          const firstRow = parseCSVLine(lines[1]);
          console.log("First data row:", firstRow);
        }

        // Check for missing required columns
        const missing = required.filter(key => !headers.includes(key));
        if (missing.length > 0) {
          reject(new Error(`CSV is missing required columns: ${missing.join(", ")}`));
          return;
        }

        const data: CSVPropertyData[] = [];

        for (let i = 1; i < lines.length; i++) {
          const row = parseCSVLine(lines[i]);
          if (row.length < headers.length) continue; // skip incomplete rows

          // Build object with normalized keys
          const obj: any = {};
          headers.forEach((header, idx) => {
            obj[header] = row[idx] ? row[idx].trim() : "";
          });

          // Only add if required fields are present
          if (required.every(key => obj[key] && obj[key] !== "")) {
            data.push({
              id: obj["id"],
              title: obj["title"],
              description: obj["description"],
              price: obj["price"],
              type: obj["type"],
              bedrooms: obj["bedrooms"],
              bathrooms: obj["bathrooms"],
              area: obj["area"],
              country: obj["country"],
              city: obj["city"],
              sold: obj["sold"] || undefined,
            });
          } else {
            // Optionally, log or collect skipped rows for debugging
            // console.warn(`Skipping row ${i + 1}: missing required fields`);
          }
        }
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

// Simple CSV line parser that handles quoted values
const parseCSVLine = (line: string): string[] => {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last value
  values.push(current.trim());
  
  return values;
};

export const generateCSVTemplate = (): string => {
  const headers = [
    'title',
    'description', 
    'price',
    'type',
    'bedrooms',
    'bathrooms',
    'city',
    'country',
    'area',
    'features',
    'square_feet',
    'featured',
    'new_property'
  ];
  
  const sampleData = [
    'Luxury Villa with Ocean View',
    'Beautiful 4-bedroom villa with stunning ocean views',
    '25000000',
    'Villa',
    '4',
    '3',
    'Chaweng',
    'Koh Samui',
    'Koh Samui',
    'Pool, Ocean View, Modern Kitchen',
    '350',
    'true',
    'false'
  ];
  
  return [headers.join(','), sampleData.join(',')].join('\n');
}; 