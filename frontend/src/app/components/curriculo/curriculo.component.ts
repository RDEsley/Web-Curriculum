import { Component, OnInit } from '@angular/core';
import { CurriculoService } from '../../services/curriculo.service';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css']
})
export class CurriculoComponent implements OnInit {
  curriculos: any[] = [];

  constructor(private curriculoService: CurriculoService) {}

  ngOnInit() {
    this.curriculoService.getCurriculos().subscribe((data) => {
      this.curriculos = data;
    });
  }

  editarCurriculo(id: number) {
    // lógica de edição
  }

  deletarCurriculo(id: number) {
    this.curriculoService.deleteCurriculo(id).subscribe();
  }
}
