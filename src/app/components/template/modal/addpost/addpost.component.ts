import {  Component, ViewChild, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbModalConfig,} from '@ng-bootstrap/ng-bootstrap';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { LoginService } from 'src/app/components/security/login.service';
import { PostService } from 'src/app/components/views/index/post.service';
import { PostImagemService } from 'src/app/components/views/index/postsservices/post-imagem.service';
import { PostTextaoService } from 'src/app/components/views/index/postsservices/post-textao.service';
import { Postimagem } from 'src/app/components/views/index/postsservices/sub-post.model';
import { User } from 'src/app/components/views/profilesetting/user.model';
import { UserService } from 'src/app/components/views/profilesetting/user.service';





@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

	 closeResult = '';
 texto: string = "";
 descricao: string = "";

 

files: File[] = [];
hora: string = "";
email: string = "";
idperson: string = "";
usuario: User = {"id": 0, "email": "", "password": "","firstName":"", "lastName":""}

     posttext: any = {"id": "",
                            "idperson": "",
                            "texto": "",
                            "email": "",
                            "tipo": "",
                             "hora": "",
                             "hastags": "",
                             "local": ""}; 

      post: any = {"id": "",
                            "idperson": "",
                            "email": "",
                            "tipo": "",
                             "hora": "",
                             "hastags": "",
                             "local": ""};


      postimagem: any = {"id": "",
                            "idperson": "",
                            "texto": "",
                            "idimagem": "",
                            "email": "",
                            "tipo": "",
                             "hora": "",
                             "hastags": "",
                             "local": "",
                             "description": ""};


      postenquete: any = {"id": "",
                            "idperson": "",
                            "Pergunta": "",
                            "Resposta1": "",
                            "Resposta2": "",
                            "Resposta3": "",
                            "Resposta4": "",
                            "total_resposta": "",
                            "email": "",
                            "tipo": "",
                             "hora": "",
                             "hastags": "",
                             "local": "",
                             "description": ""};

       postReel: any = {"id": "",
                            "idperson": "",
                            "texto": "",
                            "idimagem": "",
                            "Resposta2": "",
                            "Resposta3": "",
                            "Resposta4": "",
                            "total_resposta": "",
                            "email": "",
                            "tipo": "",
                             "hora": "",
                             "hastags": "",
                             "local": "",
                             "description": ""};

        postStories: any = {"id": "",
                            "idperson": "",
                            "texto": "",
                            "idimagem": "",
                            "email": "",
                            "tipo": "",
                             "hora": "",
                             "hastags": "",
                             "local": "",
                             "description": ""};

        postVideos: any = {"id": "",
                            "idperson": "",
                            "texto": "",
                            "idimagem": "",
                            "email": "",
                            "tipo": "",
                             "hora": "",
                             "hastags": "",
                             "local": "",
                             "description": ""};



  constructor(private modalService: NgbModal,
  private authenticationService: LoginService,
  private userservice : UserService,
  private posttextaoservice : PostTextaoService,
  private postimagemservice : PostImagemService,
  config: NgbModalConfig,
  private postservice : PostService) {config.backdrop = 'static';
		config.keyboard = false;}

	
  open(content: any) {
    this.modalService.open(content, { backdropClass: 'dark-modal',size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  close(content: any) {
  this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
}

onSelect(event : any) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event: any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}


    public PostText(){

            //Pega data formatada
        this.posttextaoservice.getHoraServidor().subscribe((resposta: string) => {
            this.hora = resposta;
            console.log(resposta);
         }); 
            
            //Pega id inefilo e Verifica se está logado
                if(this.authenticationService.isUserLoggedIn()){
                    //Pega email do usuario logado
                    this.email = this.authenticationService.getLoggedInUserName();
                        //Pega usuario pelo email
                        this.userservice.getByEmail(this.email).subscribe((resposta: User) => {
                           // this.usuario = resposta;
                            console.log(resposta.id);
                            this.idperson = resposta.id.toString();
                            //console.log(resposta);

                                //Pega cinefilo pelo id do usuario  
                                //this.cinefiloservice.findById(this.usuario.id).subscribe((resposta) => {
                                  //      console.log(resposta);
                                    //    this.cinefilo = Object.values(resposta);
                                      //  console.log(this.cinefilo);
                                //});
                   

            //Peva valores do form e envia
            this.posttext= {"id": 0,
                            "idperson": this.idperson,
                            "texto": this.texto,
                            "email": this.email,
                            "tipo": "1",
                             "hora": this.hora,
                             "hastags": "",
                             "local": ""};
            
                           
                console.log(this.posttext);
                //Salva Post
            this.posttextaoservice.create( this.posttext).subscribe((result:any)=> {
                console.log('Criado');
                this.posttextaoservice.mensagem("Post criado com sucesso!");
                this.getDismissReason("");
               
            }, () => {
                this.posttextaoservice.mensagem("Erro ao Postar!");
             }); 
               }); 

                }

    }

    public PostImagem(){

           //Pega data formatada
    this.posttextaoservice.getHoraServidor().subscribe((resposta: string) => {
      this.hora = resposta;
      console.log(resposta);
     }); 
            
            //Pega id inefilo e Verifica se está logado
                if(this.authenticationService.isUserLoggedIn()){
                    //Pega email do usuario logado
                    this.email = this.authenticationService.getLoggedInUserName();
                        //Pega usuario pelo email
                        this.userservice.getByEmail(this.email).subscribe((resposta: User) => {
                           // this.usuario = resposta;
                            console.log(resposta.id);
                            this.idperson = resposta.id.toString();
                            //console.log(resposta);

                                //Pega cinefilo pelo id do usuario  
                                //this.cinefiloservice.findById(this.usuario.id).subscribe((resposta) => {
                                  //      console.log(resposta);
                                    //    this.cinefilo = Object.values(resposta);
                                      //  console.log(this.cinefilo);
                                //});
                   

            

           //Peva valores do form e envia
            this.postimagem= {"id": 0,
                            "idperson": this.idperson,
                            "texto": this.texto,
                            "idimagem": "",
                            "email": this.email,
                            "tipo": "1",
                             "hora": this.hora,
                             "hastags": "",
                             "local": "",
                             "description": ""};
            
                           
                console.log(this.postimagem);
                //Salva Post
    if(this.files.length > 0){
            this.postimagemservice.create(this.postimagem).subscribe((result: Postimagem)=> {
                  console.log('Posted');

                        this.postservice.UploadFiles( this.files[0], this.postimagem.idperson).subscribe((result: any)=> {
                              console.log(result);
                              console.log('File UpLoaded');
                                  this.postimagemservice.mensagem("Post criado com sucesso!");
                             
                             }, (error: any) => {console.log(error);
                                console.log('Erro Upload');
                                  this.postimagemservice.mensagem("Erro ao Postar!");
                              }); 

            }, () => {
                this.postimagemservice.mensagem("Erro ao Postar!");
             }); 

            

                             
                         

             }
               }); 

                }
    }

    public PostReels(){
    }

    public PostStories(){
    }

    public PostEnquete(){
    }

    public PostVideo(){
    }

  ngOnInit(): void {
  }

}
