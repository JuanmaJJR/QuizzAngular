import {Panel} from '../milib/views/panels/panel';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {DataHolder} from '../milib/dataholder/dataholder';
import {Motor} from '../milib/engines/motor';
import {Imagen} from '../milib/views/imgs/imagen';
import {Window} from '../milib/views/window/Window';
import {Button,ButtonListener} from '../milib/views/buttons/button';
import {Label} from '../milib/views/labels/label';


export class Actividad1 implements EventsAdminListener,ButtonListener{

    //NG BUILD --PROD

    private motor:Motor;
    private panelMenu:Panel;
    private panelJuego:Panel;
    private imagenFondo:Imagen;
    private window1:Window;
    private buttonSalir:Button;
    private buttonNuevo:Button;
    private buttonContinuar:Button;
    private imagenCentro:Imagen;
    private imagenGanar:Imagen;
    private w2:Window;
    private w3:Window;
    private pmw=DataHolder.instance.nScreenWidth*0.6;
    private pmx=DataHolder.instance.nScreenWidth2-(this.pmw>>1);
    private pmh=DataHolder.instance.nScreenHeight*0.6;
    private pmy=DataHolder.instance.nScreenHeight2-(this.pmh>>1);
    private lblPreg:Label;
    private buttonResp1:Button;
    private buttonResp2:Button;
    private buttonResp3:Button;
    private buttonResp4:Button;
    private buttonX:Button;
    private arrayPreguntas: any[];
    private arrayResp: any[];
    private arrayRespCorrec: any[];

    
    


    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imagenFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenFondo.setImg('./assets/1.jpg');
        this.motor.setRaiz(this.imagenFondo);
        this.crearEscenarioMenu();
        this.arrayPreguntas=["¿Qué es una criptomoneda?"," ¿No existen entonces monedas y billetes de divisas digitales?"," Si no hay bancos centrales, ¿quién está detrás de las criptomonedas?"];
        this.arrayResp=[["Medio digital de intercambio","Moneda oficial del planeta cripto","Es una moneda intercambiable en un videojuego", "Una equacion matemática"],["Si existen", "No existen", "Solo algunos privilegiados","Existen y son de chocolate"],["Yo","Bankia","Una mezcla bionica de Steve Jobs y Billgates","En la mayoria de casos es desconocido"]];
        this.arrayRespCorrec=["Medio digital de intercambio","No existen","En la mayoria de casos es desconocido"];
    }

    /**
     * OJO!! AUNQUE EN ESTE EJEMPLO SE USE EL PANEL, ES OBLIGATORIO CREAR UN OBJETO WINDOW EN EL MILIB, Y AGREGARLE EL BOTON
     * DE SALIR EN LA ESQUINA COMO SALE EN EL LA PAGINA WEB. HABRA QUE QUITAR EL PANEL Y USAR WINDOW
     */
    private crearEscenarioMenu():void{

        this.window1=new Window(this.motor,this.pmx,this.pmy,this.pmw,this.pmh);
        this.motor.addViewToParentView(this.imagenFondo,this.window1);

        //CREAMOS IMAGEN Y AÑADIMOS AL WINDOW CENTRAL
       this.imagenCentro=new Imagen(this.motor,0,0,this.pmw,this.pmh);
       this.imagenCentro.setImg('./assets/quiz.jpg');
       this.motor.addViewToParentView(this.window1,this.imagenCentro);
        

       //AÑADIR BOTON SALIR
       this.buttonSalir=new Button(this.motor,340,320,200,100);
       this.buttonSalir.setTexto("SALIR");
       this.motor.addViewToParentView(this.window1,this.buttonSalir);
       this.buttonSalir.setImagePath('./assets/btn.png')
       this.buttonSalir.setListener(this);
       
       //AÑADIR BOTON CONTINUAR
       this.buttonContinuar=new Button(this.motor,340,180,200,100);
       this.buttonContinuar.setTexto("CONTINUAR");
       this.motor.addViewToParentView(this.window1,this.buttonContinuar);
       this.buttonContinuar.setImagePath('./assets/btn.png');
       this.buttonContinuar.setListener(this);
       //AÑADIR BOTON NUEVO
       this.buttonNuevo=new Button(this.motor,340,40,200,100);
       this.buttonNuevo.setTexto("NUEVO");
       this.motor.addViewToParentView(this.window1,this.buttonNuevo);
       this.buttonNuevo.setImagePath('./assets/btn.png');
       this.buttonNuevo.setListener(this);
       
       


    }
    buttonListenerOnClick?(btn:Button):void{
        if(btn==this.buttonNuevo){
            //CREAMOS WINDOW NUEVO
            this.w2=new Window(this.motor,this.pmx,this.pmy,this.pmw,this.pmh);
            this.motor.addViewToParentView(this.imagenFondo,this.w2);
            //CREAMOS LABEL DE LA PREGUNTA
            this.lblPreg= new Label(this.motor,340,40,200,100);
            this.lblPreg.setTexto(this.arrayPreguntas[0]);
            this.motor.addViewToParentView(this.w2,this.lblPreg);
            //CREAMOS BOTON X
            this.buttonX = new Button (this.motor,this.pmx*0.9,this.pmy*0.1,200,100);
            this.buttonX.setTexto("X");
            this.motor.addViewToParentView(this.w2,this.buttonX);
            this.buttonX.setListener(this);
            //CREAMOS BOTON RESPUESTA 1
            this.buttonResp1 = new Button (this.motor,120,220,200,100);
            this.buttonResp1.setTexto(this.arrayResp[0][0]);
            this.motor.addViewToParentView(this.w2,this.buttonResp1);
            this.buttonResp1.setListener(this);
            //CREAMOS BOTON RESPUESTA 2
            this.buttonResp2 = new Button (this.motor,520,220,200,100);
            this.buttonResp2.setTexto(this.arrayResp[0][1]);
            this.buttonResp2.setListener(this);
            this.motor.addViewToParentView(this.w2,this.buttonResp2);
            //CREAMOS BOTON RESPUESTA 3
            this.buttonResp3 = new Button (this.motor,120,320,200,100);
            this.buttonResp3.setTexto(this.arrayResp[0][2]);
            this.buttonResp3.setListener(this);
            this.motor.addViewToParentView(this.w2,this.buttonResp3);
            //CREAMOS BOTON RESPUESTA 4
            this.buttonResp4 = new Button (this.motor,520,320,200,100);
            this.buttonResp4.setTexto(this.arrayResp[0][3]);
            this.buttonResp4.setListener(this);
            this.motor.addViewToParentView(this.w2,this.buttonResp4);
        }
        //VOLVEMOS A LA PANTALLA EN LA QUE ESTABAMOS JUGANDO
        if(btn==this.buttonContinuar){
            this.motor.setViewVisibility(this.w2.uid,true);
        }
        //SALIR DEL JUEGO
        if(btn==this.buttonSalir){
            this.buttonNuevo.setTexto("ADIOS");
        }
        //SALIMOS AL MENU INICIAL
        if(btn==this.buttonX){
            this.motor.setViewVisibility(this.w2.uid,false);
        }
        //SI ACIERTAS LA PRIMERA PREGUNTA
        if(btn.getLbl().getTexto()==this.arrayRespCorrec[0]){
            this.lblPreg.setTexto(this.arrayPreguntas[1]);
            this.buttonResp1.setTexto(this.arrayResp[1][0]);
            this.buttonResp2.setTexto(this.arrayResp[1][1]);
            this.buttonResp3.setTexto(this.arrayResp[1][2]);
            this.buttonResp4.setTexto(this.arrayResp[1][3]);
        }
        //SI ACIERTAS LA SEGUNDA PREGUNTA
        else if(btn.getLbl().getTexto()==this.arrayRespCorrec[1]){
        
            this.lblPreg.setTexto(this.arrayPreguntas[2]);
            this.buttonResp1.setTexto(this.arrayResp[2][0]);
            this.buttonResp2.setTexto(this.arrayResp[2][1]);
            this.buttonResp3.setTexto(this.arrayResp[2][2]);
            this.buttonResp4.setTexto(this.arrayResp[2][3]);
        }
        //SI ACIERTAS LA TERCERA PREGUNTA, PONEMOS NUEVA VIEW DE VICTORIA
        else if(btn.getLbl().getTexto()==this.arrayRespCorrec[2]){
            this.w3=new Window(this.motor,this.pmx,this.pmy,this.pmw,this.pmh);
            this.motor.addViewToParentView(this.imagenFondo,this.w3);
            this.imagenGanar=new Imagen(this.motor,0,0,this.pmw,this.pmh);
            this.imagenGanar.setImg('./assets/hasganado.jpg');
            this.motor.addViewToParentView(this.w3,this.imagenGanar);

        }

        //SI FALLAMOS SALIMOS AL MENU PRINCIPAL. AÑADIDOS A LA CONDICION TAMBIEN LOS BOTONES DE NUEVO Y CONTINUAR PARA NO QUITAR SU FUNCIONALIDAD
        else if(btn!=this.buttonNuevo&& btn.getLbl().getTexto()!=this.arrayRespCorrec[0] && btn.getLbl().getTexto()!=this.arrayRespCorrec[1] && btn.getLbl().getTexto()!=this.arrayRespCorrec[2] && btn!=this.buttonContinuar) {
            this.motor.setViewVisibility(this.w2.uid,false);

        }
        
    
        

    }

    
    

    private crearEscenarioJuego():void{
        
    }


    screenSizeChanged?(vWidth:number,vHeight:number):void{
        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");
      }

}