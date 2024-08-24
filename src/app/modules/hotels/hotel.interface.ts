export interface THotel {
    name: string;
    type: string;
    city: string;
    address: string;
    distance: string;
    photos?: string[]; 
    title: string;
    desc: string;
    rating?: number; 
    rooms?: string[];  
    cheapestPrice: number;
    featured?: boolean;  
  }
  