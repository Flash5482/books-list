import {ChangeDetectionStrategy, Component, output} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {Mode} from '../../../../shared/enums/mode';

@Component({
  selector: 'app-add-card',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardImage,
        NgIf
    ],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCardComponent {
  readonly mode = Mode;
  addBook = output<Mode>();
}
