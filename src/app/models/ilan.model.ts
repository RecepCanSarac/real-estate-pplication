export interface Ilan {
  id?: string;                   
  baslik: string;                
  aciklama: string;              
  fiyat: number;                 
  konum: string;                 
  tur: 'satilik' | 'kiralik';    
  fotoUrl: string;               
  resimler?: string[];          
  odaSayisi?: number;           
  
  userId?: string;              
  userEmail?: string;           
  createdAt?: string;           
}
