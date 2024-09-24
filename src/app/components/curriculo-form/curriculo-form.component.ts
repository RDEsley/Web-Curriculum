import { Component, OnInit } from '@angular/core';
import { CurriculoService } from '../../services/curriculo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curriculo-form',
  templateUrl: './curriculo-form.component.html',
  styleUrls: ['./curriculo-form.component.css']
})
export class CurriculoFormComponent implements OnInit {
  curriculo: any = {};
  isEdit = false;

  constructor(
    private curriculoService: CurriculoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.curriculoService.getCurriculo(id).subscribe((data) => {
        this.curriculo = data;
      });
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.curriculoService.updateCurriculo(this.curriculo).subscribe();
    } else {
      this.curriculoService.addCurriculo(this.curriculo).subscribe();
    }
  }
}
