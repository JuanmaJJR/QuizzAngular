import {Panel} from '../milib/views/panels/panel';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {DataHolder} from '../milib/dataholder/dataholder';
import {Motor} from '../milib/engines/motor';
import {Imagen} from '../milib/views/imgs/imagen';
import {Window} from '../milib/views/window/Window';
import {Button} from '../milib/views/buttons/button';

export class Actividad1 implements EventsAdminListener{

    private motor:Motor;
    private panelMenu:Panel;
    private panelJuego:Panel;
    private imagenFondo:Imagen;
    private window1:Window;
    private buttonSalir:Button;
    private buttonNuevo:Button;
    private buttonContinuar:Button;
    private imagenCentro:Imagen;

    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imagenFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenFondo.setImg('./assets/1.jpg');
        this.motor.setRaiz(this.imagenFondo);
        this.crearEscenarioMenu();
        
    }

    /**
     * OJO!! AUNQUE EN ESTE EJEMPLO SE USE EL PANEL, ES OBLIGATORIO CREAR UN OBJETO WINDOW EN EL MILIB, Y AGREGARLE EL BOTON
     * DE SALIR EN LA ESQUINA COMO SALE EN EL LA PAGINA WEB. HABRA QUE QUITAR EL PANEL Y USAR WINDOW
     */
    private crearEscenarioMenu():void{

        let pmw=DataHolder.instance.nScreenWidth*0.6;
        let pmh=DataHolder.instance.nScreenHeight*0.6;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);
     
        
        this.window1=new Window(this.motor,pmx,pmy,pmw,pmh);
        this.motor.addViewToParentView(this.imagenFondo,this.window1);

        //CREAMOS IMAGEN Y AÑADIMOS AL WINDOW CENTRAL
       this.imagenCentro=new Imagen(this.motor,0,0,pmw,pmh);
       this.imagenCentro.setImg('./assets/quiz.jpg');
       this.motor.addViewToParentView(this.window1,this.imagenCentro);
        

       //AÑADIR BOTON SALIR
       this.buttonSalir=new Button(this.motor,340,320,200,100);
       this.buttonSalir.setTexto("SALIR");
       this.motor.addViewToParentView(this.window1,this.buttonSalir);
       this.buttonSalir.setImagePath('./assets/btn.png')
       //AÑADIR BOTON CONTINUAR
       this.buttonContinuar=new Button(this.motor,340,180,200,100);
       this.buttonContinuar.setTexto("CONTINUAR");
       this.motor.addViewToParentView(this.window1,this.buttonContinuar);
       this.buttonContinuar.setImagePath('./assets/btn.png')
       //AÑADIR BOTON NUEVO
       this.buttonNuevo=new Button(this.motor,340,40,200,100);
       this.buttonNuevo.setTexto("NUEVO");
       this.motor.addViewToParentView(this.window1,this.buttonNuevo);
       this.buttonNuevo.setImagePath('./assets/btn.png')

    }

    private crearEscenarioJuego():void{
        
    }


    screenSizeChanged?(vWidth:number,vHeight:number):void{
        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");
      }

}