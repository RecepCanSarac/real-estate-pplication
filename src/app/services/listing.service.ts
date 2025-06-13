import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, updateDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Listing } from '../models/listing.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private authService: AuthService
  ) {}

  async createListing(listing: Omit<Listing, 'id' | 'createdAt' | 'userId' | 'userEmail'>, images: File[]) {
    let user = await this.authService.user$.toPromise();
    if (!user) {
      user = await this.authService.getCurrentUser();
    }
    if (!user) throw new Error('Kullanıcı girişi gerekli');
    console.log('Kullanıcı:', user);
    console.log('Kullanıcı email:', user.email);

    const imageUrls = await Promise.all(
      images.map(image => this.uploadImage(image))
    );

    const listingData = {
      ...listing,
      images: imageUrls,
      createdAt: new Date(),
      userId: user.uid,
      userEmail: user.email || 'bilgi yok'
    };

    const docRef = await addDoc(collection(this.firestore, 'listings'), listingData);
    return { id: docRef.id, ...listingData };
  }

  async getListings() {
    const listingsRef = collection(this.firestore, 'listings');
    const q = query(listingsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Listing[];
  }

  async getListingById(id: string) {
    const docRef = doc(this.firestore, 'listings', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Listing;
    }
    return null;
  }

  async updateListing(id: string, listing: Partial<Listing>, newImages?: File[]) {
    const docRef = doc(this.firestore, 'listings', id);
    const currentListing = await this.getListingById(id);
    
    if (!currentListing) throw new Error('İlan bulunamadı');

    let imageUrls = currentListing.images;
    if (newImages && newImages.length > 0) {
      // Eski resimleri sil
      await Promise.all(
        currentListing.images.map(url => this.deleteImage(url))
      );
      // Yeni resimleri yükle
      imageUrls = await Promise.all(
        newImages.map(image => this.uploadImage(image))
      );
    }

    const updateData = {
      ...listing,
      images: imageUrls,
      updatedAt: new Date()
    };

    await updateDoc(docRef, updateData);
    return { id, ...updateData };
  }

  async deleteListing(id: string) {
    const listing = await this.getListingById(id);
    if (!listing) throw new Error('İlan bulunamadı');

    // Resimleri sil
    await Promise.all(
      listing.images.map(url => this.deleteImage(url))
    );

    // İlanı sil
    await deleteDoc(doc(this.firestore, 'listings', id));
  }

  private async uploadImage(file: File): Promise<string> {
    const timestamp = new Date().getTime();
    const path = `listings/${timestamp}_${file.name}`;
    const storageRef = ref(this.storage, path);
    
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  private async deleteImage(url: string) {
    try {
      const storageRef = ref(this.storage, url);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Resim silinirken hata oluştu:', error);
    }
  }
} 