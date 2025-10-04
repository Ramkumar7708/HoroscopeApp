import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet  } from '@angular/router';
import { FormBuilder , FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,HttpClientModule, RouterOutlet, ReactiveFormsModule, MatFormFieldModule , MatSelectModule,MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  horoscopeForm!: FormGroup;
  title = 'HoroscopeMatching';
  maxStars = 11;
  rating = 8;
  IsShow = false;
  compatible :string = '';
  horoScopeList :any =  [] ;

  constructor(private fb: FormBuilder, private httpclient : HttpClient) {}
  
   ngOnInit(): void {
    this.horoscopeForm = this.fb.group({
      bride: this.fb.group({
        gender: ['', Validators.required]
      }),
      groom: this.fb.group({
        gender: ['', Validators.required]
      })
    });

    this.httpclient.get<any[]>('assets/data/NakshatrasDetails.json').subscribe((result) =>
    {
         this.horoScopeList = result;
    });
    
  
}

onSubmit(): void {
 if(this.horoscopeForm.valid)
 {
    this.IsShow = true;
    if(this.starsArray.length < this.rating)
    {
     this.compatible = 'Not Compatible';
    }
    else if(this.starsArray.length > this.rating && this.starsArray.length < 9)
    {
     this.compatible = 'Good Match';
    }
    else{
     this.compatible = 'Very Good Match';
    }
  }
}

  get starsArray() {
    var array =  Array(this.maxStars);
    console.log('number of stars,' + array);
    return array;
  }

  shareApp() {
  if (navigator.share) {
    navigator.share({
      title: 'Star Sync',
      text: 'Check out this Horoscope Matching app!',
      url: 'https://your-pwa-url.com'
    }).then(() => {
      console.log('Successful share');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    alert('Sharing is not supported in this browser.');
  }
}
 
}
