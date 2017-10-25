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
    private buttonX2:Button;
    private arrayPreguntas: any[];
    private arrayResp: any[];
    private arrayRespCorrec: any[];
    private imagenTitulo:Imagen;
    private imagenW2:Imagen;
    private imagenComo:Imagen;
    private buttonComo:Button;
    private wComo:Window;
    private lblComo:Label;
    private lbl2Como:Label;
    private lbl3Como:Label;
    private lbl4Como:Label;
    private lbla:Label;
    private lblPreg1:Label;
    private Contador;

    
    


    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imagenFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenFondo.setImg('./assets/1.jpg');
        this.motor.setRaiz(this.imagenFondo);
        this.crearEscenarioMenu();
        this.arrayPreguntas=["¿Qué es una criptomoneda?"," ¿No existen entonces monedas y billetes de divisas digitales?"," Si no hay bancos centrales, ¿quién está detrás de las criptomonedas?"];
        this.arrayResp=[["Medio digital de intercambio","Moneda del planeta cripto","Moneda de un videojuego", "Una equacion matemática"],["Si existen", "No existen", "Solo algunos privilegiados","Existen y son de chocolate"],["Yo","Bankia","Billgates","Suele ser desconocido"]];
        this.arrayRespCorrec=["Medio digital de intercambio","No existen","Suele ser desconocido"];
        EventsAdmin.instance.addListener(this);
    }

    /**
     * OJO!! AUNQUE EN ESTE EJEMPLO SE USE EL PANEL, ES OBLIGATORIO CREAR UN OBJETO WINDOW EN EL MILIB, Y AGREGARLE EL BOTON
     * DE SALIR EN LA ESQUINA COMO SALE EN EL LA PAGINA WEB. HABRA QUE QUITAR EL PANEL Y USAR WINDOW
     */
    private crearEscenarioMenu():void{

        this.window1=new Window(this.motor,this.pmx,this.pmy,this.pmw,this.pmh);
        this.motor.addViewToParentView(this.imagenFondo,this.window1);

        //CREAMOS IMAGEN CON TITULO
        this.imagenTitulo=new Imagen(this.motor,this.pmx,this.pmy-250,this.pmw/1,this.pmh/1.5);
        this.imagenTitulo.setImg('./assets/tcr.png')
        this.motor.addViewToParentView(this.imagenFondo,this.imagenTitulo);


        //CREAMOS IMAGEN Y AÑADIMOS AL WINDOW CENTRAL
       this.imagenCentro=new Imagen(this.motor,0,0,this.pmw,this.pmh);
       this.imagenCentro.setImg('./assets/btc.jpg');
       this.motor.addViewToParentView(this.window1,this.imagenCentro);
        
       //AÑADIR BOTON COMO JUGAR
       this.buttonComo=new Button(this.motor,this.pmw-this.pmw/10,this.pmh-this.pmh/12,this.pmw/10,this.pmh/12);
       this.buttonComo.setTexto("COMO JUGAR");
       this.motor.addViewToParentView(this.window1,this.buttonComo);
       this.buttonComo.setImagePath('./assets/btn.png')
       this.buttonComo.setListener(this);

       //AÑADIR BOTON SALIR
       this.buttonSalir=new Button(this.motor,this.pmx*0.4,this.pmy*2.1,this.pmw/5.5,this.pmh/6);
       this.buttonSalir.setTexto("SALIR");
       this.motor.addViewToParentView(this.window1,this.buttonSalir);
       this.buttonSalir.setImagePath('./assets/btn.png')
       this.buttonSalir.setListener(this);
       
       //AÑADIR BOTON CONTINUAR
       this.buttonContinuar=new Button(this.motor,this.pmx*0.4,this.pmy*1.2,this.pmw/5.5,this.pmh/6);
       this.buttonContinuar.setTexto("CONTINUAR");
       this.motor.addViewToParentView(this.window1,this.buttonContinuar);
       this.buttonContinuar.setImagePath('./assets/btn.png');
       this.buttonContinuar.setListener(this);
       //AÑADIR BOTON NUEVO
       this.buttonNuevo=new Button(this.motor,this.pmx*0.4,this.pmy*0.3,this.pmw/5.5,this.pmh/6);
       this.buttonNuevo.setTexto("NUEVO");
       this.motor.addViewToParentView(this.window1,this.buttonNuevo);
       this.buttonNuevo.setImagePath('./assets/btn.png');
       this.buttonNuevo.setListener(this);

        //LABEL PARA SETEAR FONTS :P
        this.lbla= new Label(this.motor,this.pmx*1.3,40,0,0);
        this.motor.addViewToParentView(this.window1,this.lbla);
        this.lbla.setTexto(""); 
        this.lbla.setFontStyle("12px Comic Sans MS");
       
       


    }
    buttonListenerOnClick?(btn:Button):void{
        if(btn==this.buttonNuevo){
            //CREAMOS WINDOW NUEVO
            this.w2=new Window(this.motor,this.pmx,this.pmy,this.pmw,this.pmh);
            this.motor.addViewToParentView(this.imagenFondo,this.w2);
            //IMAGEN PARA EL WINDOW
            this.imagenW2=new Imagen(this.motor,0,0,this.pmw,this.pmh);
            this.imagenW2.setImg('./assets/2.jpg')
            this.motor.addViewToParentView(this.w2,this.imagenW2);

            //CREAMOS LABEL DE LA PREGUNTA
            this.lblPreg= new Label(this.motor,this.pmx*1.3,40,this.pmw/5.5,this.pmh/6);
            this.lblPreg.setTexto(this.arrayPreguntas[0]);
            this.motor.addViewToParentView(this.w2,this.lblPreg);
            this.lblPreg.setFontStyle("20px Comic Sans MS");
            //CREAMOS BOTON X
            this.buttonX = new Button (this.motor,this.pmw-50,0,this.pmh/12,this.pmh/12);
            this.buttonX.setTexto("");
            this.motor.addViewToParentView(this.w2,this.buttonX);
            this.buttonX.setListener(this);
            this.buttonX.setImagePath('./assets/x.png');
            //CREAMOS BOTON RESPUESTA 1
            this.buttonResp1 = new Button (this.motor,0,this.pmy*1.5,this.pmw/3.5,this.pmh/6);
            this.buttonResp1.setTexto(this.arrayResp[0][0]);
            this.buttonResp1.setImagePath('./assets/btn2.png');
            this.motor.addViewToParentView(this.w2,this.buttonResp1);
            this.buttonResp1.setListener(this);
            //CREAMOS BOTON RESPUESTA 2
            this.buttonResp2 = new Button (this.motor,this.pmw-this.pmw/3.5,this.pmy*1.5,this.pmw/3.5,this.pmh/6);
            this.buttonResp2.setTexto(this.arrayResp[0][1]);
            this.buttonResp2.setListener(this);
            this.buttonResp2.setImagePath('./assets/btn2.png');
            this.motor.addViewToParentView(this.w2,this.buttonResp2);
            //CREAMOS BOTON RESPUESTA 3
            this.buttonResp3 = new Button (this.motor,0,this.pmy*2.2,this.pmw/3.5,this.pmh/6);
            this.buttonResp3.setTexto(this.arrayResp[0][2]);
            this.buttonResp3.setListener(this);
            this.buttonResp3.setImagePath('./assets/btn2.png');
            this.motor.addViewToParentView(this.w2,this.buttonResp3);
            //CREAMOS BOTON RESPUESTA 4
            this.buttonResp4 = new Button (this.motor,this.pmw-this.pmw/3.5,this.pmy*2.2,this.pmw/3.5,this.pmh/6);
            this.buttonResp4.setTexto(this.arrayResp[0][3]);
            this.buttonResp4.setListener(this);
            this.buttonResp4.setImagePath('./assets/btn2.png');
            this.motor.addViewToParentView(this.w2,this.buttonResp4);
        }
        //CREAMOS PANTALLA COMO JUGAR
        if(btn==this.buttonComo){
            this.wComo=new Window(this.motor,this.pmx,this.pmy,this.pmw,this.pmh);
            this.motor.addViewToParentView(this.imagenFondo,this.wComo);
            //IMAGEN PARA EL FONDO 
            this.imagenComo=new Imagen(this.motor,0,0,this.pmw,this.pmh);
            this.imagenComo.setImg('./assets/lt.jpg')
            this.motor.addViewToParentView(this.wComo,this.imagenComo);
           


            this.lblPreg1= new Label(this.motor,this.pmx*1.3,40,200,100);
            this.lblPreg1.setTexto("¿COMO JUGAR?");
            this.lblPreg1.setFontStyle("23px Impact");
            this.motor.addViewToParentView(this.wComo,this.lblPreg1);
            
            //LBL 1 TEXTO DESCRIPTIVO
            this.lblComo= new Label(this.motor,this.pmx*1.3,this.pmy*0.8,this.pmw/10,this.pmh/12);
            this.lblComo.setTexto(" Cada vez que aciertes, recibiras 1 BTC y pasaras a la siguiente pregunta");
            this.motor.addViewToParentView(this.wComo,this.lblComo);
            
            //LBL 2 TEXTO DESCRIPTIVO
            this.lbl2Como= new Label(this.motor,this.pmx*1.3,this.pmy*1.2,this.pmw/10,this.pmh/12);
            this.lbl2Como.setTexto("Si fallas una vez, recibiras 1 ETH cada vez que aciertes");
            this.motor.addViewToParentView(this.wComo,this.lbl2Como);
            //LBL 3 TEXTO DESCRIPTIVO
            this.lbl3Como= new Label(this.motor,this.pmx*1.3,this.pmy*1.6,this.pmw/10,this.pmh/12);
            this.lbl3Como.setTexto("Si fallas dos veces, recibiras 1 LTC cada vez que aciertes");
            this.motor.addViewToParentView(this.wComo,this.lbl3Como);
            //LBL 4 TEXTO DESCRIPTIVO
            this.lbl4Como= new Label(this.motor,this.pmx*1.3,this.pmy*1.9,this.pmw/10,this.pmh/12);
            this.lbl4Como.setTexto("Si vuelves a fallar el juego habrá terminado");
            this.motor.addViewToParentView(this.wComo,this.lbl4Como);
            
            //BTN VOLVER AL MENU
            this.buttonX2 = new Button (this.motor,this.pmw-50,0,this.pmh/12,this.pmh/12);
            this.buttonX2.setTexto("");
            this.motor.addViewToParentView(this.wComo,this.buttonX2);
            this.buttonX2.setListener(this);
            this.buttonX2.setImagePath('./assets/x.png');
           

        }
        //VOLVEMOS A LA PANTALLA EN LA QUE ESTABAMOS JUGANDO
        if(btn==this.buttonContinuar){
            this.motor.setViewVisibility(this.w2.uid,true);
        }
        //SALIR DEL JUEGO
        if(btn==this.buttonSalir){
            this.wComo=new Window(this.motor,this.pmx,this.pmy,this.pmw,this.pmh);
            this.buttonNuevo.setTexto("ADIOS");
        }
        //SALIMOS AL MENU INICIAL
        if(btn==this.buttonX){
            this.motor.setViewVisibility(this.w2.uid,false);
            this.motor.setViewVisibility(this.w3.uid,false);
        }
        if(btn==this.buttonX2){
            this.motor.setViewVisibility(this.wComo.uid,false);
        }
        if(btn==this.buttonSalir){
            this.motor.setViewVisibility(this.window1.uid,false);
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
            this.motor.addViewToParentView(this.w3,this.buttonX);

        }

        //SI FALLAMOS SALIMOS AL MENU PRINCIPAL. AÑADIDOS A LA CONDICION TAMBIEN LOS BOTONES DE NUEVO Y CONTINUAR PARA NO QUITAR SU FUNCIONALIDAD
        else if(btn!=this.buttonNuevo&& btn.getLbl().getTexto()!=this.arrayRespCorrec[0] && btn.getLbl().getTexto()!=this.arrayRespCorrec[1] && btn.getLbl().getTexto()!=this.arrayRespCorrec[2] && btn!=this.buttonContinuar) {
            this.motor.setViewVisibility(this.w2.uid,false);

        }
        
    
        

    }

    
    

    private crearEscenarioJuego():void{
        
    }


    screenSizeChanged?(vWidth:number,vHeight:number):void{
        let pmw=DataHolder.instance.nScreenWidth*0.6;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmh=DataHolder.instance.nScreenHeight*0.6;
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);
       
        //AJUSTAMOS LA POSICION DE LOS BOTON Y EL LBLPREGUNTA CUANDO LA PANTALLA CAMBIE DE TAMAÑO, PARA AJUSTARLA.
        

        
        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");
        this.imagenFondo.setSize(DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);

        this.window1.setPosition(pmx,pmy);
        this.window1.setSize(pmw,pmh);

        this.imagenTitulo.setSize(pmw/1,pmh/1.5);
        this.imagenTitulo.setPosition(pmx,pmy-pmh/2);
        
        this.wComo.setPosition(pmx,pmy);
        this.wComo.setSize(pmw,pmh);

        this.imagenComo.setPosition(0,0);
        this.imagenComo.setSize(pmw,pmh);


        this.lblPreg1.setPosition(pmx*1.3,40);
        this.lblPreg1.setSize(pmw/5.5,pmh/6);
        this.lblComo.setPosition(pmx*1.3,pmy*0.8);
        this.lblComo.setSize(pmw/10,pmh/12);

        this.lbl2Como.setPosition(pmx*1.3,pmy*1.2);
        this.lbl2Como.setSize(pmw/10,pmh/12);

        this.lbl3Como.setPosition(pmx*1.3,pmy*1.6);
        this.lbl3Como.setSize(pmw/10,pmh/12);

        this.lbl4Como.setPosition(pmx*1.3,pmy*1.9);
        this.lbl4Como.setSize(pmw/10,pmh/12);
        
        this.buttonX2.setPosition(pmw-50,0);
        this.buttonX2.setSize(pmh/12,pmh/12);


        
        this.imagenCentro.setPosition(0,0);
        this.imagenCentro.setSize(pmw,pmh);
         this.buttonComo.setPosition(pmw-pmw/10,pmh-pmh/12);
        this.buttonComo.setSize(pmw/10,pmh/12);



        this.buttonNuevo.setPosition(pmx*0.4,pmy*0.3);
        this.buttonNuevo.setSize(pmw/5.5,pmh/6);


       this.buttonSalir.setPosition(pmx*0.4,pmy*2.1);
       this.buttonSalir.setSize(pmw/5.5,pmh/6);



       this.buttonContinuar.setPosition(pmx*0.4,pmy*1.2);
       this.buttonContinuar.setSize(pmw/5.5,pmh/6);


       this.buttonX.setPosition(pmw-50,0);
       this.buttonX.setSize(pmh/12,pmh/12);

       /////////

       this.w2.setPosition(pmx,pmy);
       this.w2.setSize(pmw,pmh);

       this.imagenW2.setPosition(0,0);
       this.imagenW2.setSize(pmw,pmh);

       this.lblPreg.setPosition(pmx*1.3,40);
       this.lblPreg.setSize(pmw/5.5,pmh/6);
       //

        
       //

        this.buttonResp1.setPosition(0,pmy*1.5);
        this.buttonResp1.setSize(pmw/3.5,pmh/6);
        this.buttonResp2.setPosition(pmw-pmw/3.5,pmy*1.5);
        this.buttonResp2.setSize(pmw/3.5,pmh/6);
        this.buttonResp3.setPosition(0,pmy*2.2);
        this.buttonResp3.setSize(pmw/3.5,pmh/6);
        this.buttonResp4.setPosition(pmw-pmw/3.5,pmy*2.2);
        this.buttonResp4.setSize(pmw/3.5,pmh/6);
        //



        this.w3.setPosition(pmx,pmy);
        this.w3.setSize(pmw,pmh);

        this.imagenGanar.setPosition(0,0);
        this.imagenGanar.setSize(pmw,pmh);

        

      
    
      }

}