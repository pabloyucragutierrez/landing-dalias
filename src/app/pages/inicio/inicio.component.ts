import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { AgendarVisitaModalComponent } from '../../components/agendar-visita-modal/agendar-visita-modal.component';
import { environment } from '../../../environments/environment';

interface AcordeonItem {
  id: number;
  titulo: string;
  contenido: string;
  activo: boolean;
}

interface ImagenGaleria {
  src: string;
  alt: string;
}

interface SlideItem {
  titulo: string;
  subtitulo: string;
  imagen: string;
  icono: string;
  items: {
    titulo: string;
    descripcion: string;
  }[];
}

interface FormularioContacto {
  tipoConsulta: string;
  mensaje: string;
  nombre: string;
  correo: string;
  numeroMovil: string;
}

interface ErroresContacto {
  tipoConsulta: string;
  nombre: string;
  correo: string;
  numeroMovil: string;
}

interface PreguntaFrecuente {
  id: number;
  pregunta: string;
  respuesta: string;
  activo: boolean;
}

interface Actividad {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  imagePublicId: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AgendarVisitaModalComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(1.05)' }),
        animate(
          '1500ms ease-in-out',
          style({ opacity: 1, transform: 'scale(1)' }),
        ),
      ]),
    ]),
  ],
})
export class InicioComponent implements OnInit, OnDestroy {
  @ViewChild('actividadesCarrusel') actividadesCarrusel!: ElementRef;
  @ViewChild('instalacionesCarrusel') instalacionesCarrusel!: ElementRef;
  @ViewChild('modalVisita') modalVisita!: AgendarVisitaModalComponent;

  slideActual = 0;
  slideActualActividades = 0;
  enviandoFormularioContacto = false;

  imagenActualNosotros = 0;
  imagenesNosotros: string[] = [
    '/nosotros1.jpg',
    '/nosotros2.jpg',
    '/nosotros3.jpg',
    '/nosotros4.jpg',
    '/nosotros5.jpg',
    '/nosotros6.jpg',
    '/nosotros7.jpg',
  ];
  intervaloNosotros: any;

  get esPrimeraImagen(): boolean {
    return this.imagenActualNosotros === 0;
  }

  mostrarModalConfirmacionContacto = false;

  actividades: Actividad[] = [];

  indiceInstalacion = 0;
  instalacionesItems = [0, 1, 2, 3];

  modalImagenAbierto = false;
  indiceSlideActual = 0;
  indiceImagenActual = 0;

  carruselKey = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
  ) {}

  serviciosPrincipales = [
    {
      id: 'permanente',
      titulo: 'Residencia Permanente',
      descripcion:
        'Hogar integral con atención continua, calidez y profesionalismo',
      detalles: [
        'Atención médica y de enfermería 24/7',
        'Alimentación balanceada con superalimentos',
        'Actividades recreativas y terapéuticas',
        'Habitaciones cómodas y seguras',
      ],
      imagen: '/permanente1.jpg',
      link: 'https://wa.link/db4jzd',
    },
    {
      id: 'temporal',
      titulo: 'Residencia Temporal',
      descripcion: 'Estadías cortas con atención profesional completa',
      detalles: [
        'Flexibilidad según tiempo de estadía',
        'Dinámicas diarias de estimulación',
        'Ideal para descanso del cuidador',
        'Adaptación progresiva',
      ],
      imagen: '/permanente2.jpg',
      link: 'https://wa.link/k3fj0r',
    },
    {
      id: 'centro-dia',
      titulo: 'Centro de Día',
      descripcion: 'Acompañamiento diurno con actividades y terapias',
      detalles: [
        'Jornada diurna estructurada',
        'Terapias ocupacionales y físicas',
        'Estimulación cognitiva',
        'Alimentación supervisada',
      ],
      imagen: '/permanente3.jpg',
      link: 'https://wa.link/91v3xr',
    },
    {
      id: 'post-operatoria',
      titulo: 'Residencia Post Operatoria',
      descripcion: 'Recuperación supervisada con atención médica especializada',
      detalles: [
        'Observación médica constante',
        'Enfermería especializada',
        'Rutinas de rehabilitación guiadas',
        'Administración segura de tratamientos',
      ],
      imagen: '/permanente4.jpg',
      link: 'https://wa.link/smm7ny',
    },
  ];

  slidesCarrusel: SlideItem[] = [
    {
      titulo: 'Planes de Estadía',
      subtitulo: 'Opciones Variadas',
      imagen: '/servicios1.png',
      icono: 'bx bx-calendar-check',
      items: [
        {
          titulo: 'Estadía Permanente',
          descripcion: 'Cuidado integral y acompañamiento continuo.',
        },
        {
          titulo: 'Estadía Temporal',
          descripcion: 'Estancias cortas con atención profesional.',
        },
        {
          titulo: 'Centro de Día',
          descripcion: 'Acompañamiento diurno y actividades.',
        },
        {
          titulo: 'Post Operatoria',
          descripcion: 'Recuperación segura y supervisada.',
        },
      ],
    },
    {
      titulo: 'Salud Médica',
      subtitulo: 'Revisión Preventiva Profesional',
      imagen: '/servicios2.png',
      icono: 'bx bx-plus',
      items: [
        {
          titulo: 'Consulta Geriátrica',
          descripcion:
            'Evaluación integral de la salud, adaptada a las necesidades del adulto mayor.',
        },
        {
          titulo: 'Consulta a Domicilio',
          descripcion:
            'Atención médica en casa, facilitando un diagnóstico más preciso.',
        },
        {
          titulo: 'Consulta Online',
          descripcion:
            'Seguimiento médico virtual, ideal para consultas de control.',
        },
      ],
    },
    {
      titulo: 'Rehabilitación',
      subtitulo: 'Movimiento y Autonomía',
      imagen: '/servicios3.png',
      icono: 'bx bx-dumbbell',
      items: [
        {
          titulo: 'Fisioterapia',
          descripcion:
            'Mejora movilidad y equilibrio, favoreciendo su autonomía y previniendo caídas.',
        },
        {
          titulo: 'Terapia Ocupacional',
          descripcion:
            'Fomenta independencia diaria, estimulando funciones cognitivas.',
        },
        {
          titulo: 'Spa Geriátrico',
          descripcion:
            'Relajación y bienestar integral, reduce el estrés y mejora el descanso.',
        },
      ],
    },
  ];

  acordeonItems: AcordeonItem[] = [
    {
      id: 1,
      titulo: 'Planes de Estadía',
      contenido:
        'Incluye alojamiento, alimentación balanceada, atención de enfermería, seguimiento geriátrico, terapias y actividades.',
      activo: false,
    },
    {
      id: 2,
      titulo: 'Consulta Geriátrica',
      contenido:
        'Atención médica especializada orientada al control y seguimiento del adulto mayor.',
      activo: false,
    },
    {
      id: 3,
      titulo: 'Terapias y Rehabilitación',
      contenido:
        'Programas de fisioterapia y terapia ocupacional orientados a la autonomía.',
      activo: false,
    },
  ];

  preguntasFrecuentes: PreguntaFrecuente[] = [
    {
      id: 1,
      pregunta:
        '¿Cuándo debería considerar una residencia geriátrica para mi familiar?',
      respuesta:
        'Es recomendable considerar una residencia geriátrica para adultos mayores cuando el familiar comienza a necesitar mayor acompañamiento, supervisión, apoyo en actividades diarias o cuando la familia busca mejorar su calidad de vida, previniendo riesgos como caídas o aislamiento. <br><br>👉 Revise nuestra guía para elegir la residencia adecuada: <a href="https://goo.su/Lis06yx" target="_blank" rel="noopener noreferrer">https://goo.su/Lis06yx</a>',
      activo: false,
    },
    {
      id: 2,
      pregunta:
        '¿Qué tipo de adultos mayores pueden vivir la experiencia Las Dalias?',
      respuesta:
        'Residencia Las Dalias está orientada principalmente a adultos mayores independientes o semi dependientes que desean vivir en un entorno cómodo, seguro y acompañado, manteniendo su autonomía y recibiendo apoyo profesional cuando lo necesiten.',
      activo: false,
    },
    {
      id: 3,
      pregunta:
        '¿Cuáles son los servicios de cuidado para un adulto mayor y en qué se diferencian?',
      respuesta:
        'Ofrecemos residencia permanente, residencia temporal, centro de día, residencia post operatoria y consultas geriátricas, adaptándonos a distintas necesidades.<br><br>Cada servicio se diferencia por el nivel de acompañamiento, duración de la estadía y tipo de cuidado requerido, siempre con un enfoque personalizado.',
      activo: false,
    },
    {
      id: 4,
      pregunta:
        '¿Cómo se garantiza la seguridad y el bienestar de los residentes?',
      respuesta:
        'La seguridad del adulto mayor es prioritaria. Contamos con personal de enfermería las 24 horas, monitoreo permanente, protocolos de salud, sistema de emergencias médicas, instalaciones adaptadas y seguimiento geriátrico continuo para actuar de forma rápida y segura ante cualquier situación.',
      activo: false,
    },
    {
      id: 5,
      pregunta:
        '¿Cómo pueden los familiares participar en la vida del residente y cómo es la comunicación con el personal?',
      respuesta:
        'En Residencia Las Dalias, la familia participa activamente mediante visitas, actividades compartidas y una comunicación constante y transparente con el equipo, fortaleciendo la confianza y el bienestar del residente.',
      activo: false,
    },
  ];

  get preguntasColumna1(): PreguntaFrecuente[] {
    return this.preguntasFrecuentes.filter((_, index) => index % 2 === 0);
  }

  get preguntasColumna2(): PreguntaFrecuente[] {
    return this.preguntasFrecuentes.filter((_, index) => index % 2 !== 0);
  }

  formularioContacto: FormularioContacto = {
    tipoConsulta: '',
    mensaje: '',
    nombre: '',
    correo: '',
    numeroMovil: '',
  };

  erroresContacto: ErroresContacto = {
    tipoConsulta: '',
    nombre: '',
    correo: '',
    numeroMovil: '',
  };

  imagenesGaleria: ImagenGaleria[][] = [
    // Slide 1
    [
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770050931/gallery1_lb5bfr.png',
        alt: 'Habitación Principal',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770050926/gallery2_qj7jgs.png',
        alt: 'Habitación con Sala',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770050929/gallery3_cpal4y.jpg',
        alt: 'Baño 1',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049419/gallery4_pxur9t.jpg',
        alt: 'Baño 2',
      },
    ],
    // Slide 2
    [
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049640/gallery5_vztful.png',
        alt: 'Comedor',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049640/gallery6_ge32y4.jpg',
        alt: 'Sala de Terapias',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049640/gallery7_nnfes5.png',
        alt: 'Cocina',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049642/gallery8_dtdr4s.jpg',
        alt: 'Recepción',
      },
    ],
    // Slide 3
    [
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049781/gallery9_qulhj4.jpg',
        alt: 'Piscina',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049781/gallery10_pxtddx.jpg',
        alt: 'Área de Lectura',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049781/gallery11_t7bpje.jpg',
        alt: 'Habitación Suite',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049781/gallery12_rsw3ip.jpg',
        alt: 'Terraza',
      },
    ],
    // Slide 4
    [
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049947/gallery13_xide0z.jpg',
        alt: 'Gimnasio',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049948/gallery14_yii0or.jpg',
        alt: 'Sala de Actividades',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049949/gallery15_tleh0z.jpg',
        alt: 'Capilla',
      },
      {
        src: 'https://res.cloudinary.com/dd5mnpde5/image/upload/f_auto,q_60,w_1200,c_limit/v1770049948/gallery16_nxmmdr.jpg',
        alt: 'Enfermería',
      },
    ],
  ];

  get imagenesSlideActual(): ImagenGaleria[] {
    return this.imagenesGaleria[this.indiceSlideActual] || [];
  }

  get imagenActual(): ImagenGaleria {
    return (
      this.imagenesSlideActual[this.indiceImagenActual] || { src: '', alt: '' }
    );
  }

  ngOnInit(): void {
    this.precargarImagenes();
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.http
  .get<Actividad[]>(`${environment.apiUrl}/actividades`)
      .subscribe({
        next: (response) => {
          this.actividades = response.map((actividad) => ({
            ...actividad,
            fecha: actividad.subtitulo,
          })) as any;
          console.log('Actividades cargadas:', this.actividades);
        },
        error: (error) => {
          console.error('Error al cargar actividades:', error);
          this.actividades = [];
        },
      });
  }

  ngOnDestroy(): void {
    this.detenerCarruselNosotros();
  }

  precargarImagenes(): void {
    if (isPlatformBrowser(this.platformId)) {
      let imagenesPreCargadas = 0;
      const totalImagenes = this.imagenesNosotros.length;

      this.imagenesNosotros.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          imagenesPreCargadas++;
          if (imagenesPreCargadas === totalImagenes) {
            this.iniciarCarruselNosotros();
          }
        };
        img.onerror = () => {
          imagenesPreCargadas++;
          console.error(`Error cargando imagen: ${src}`);
          if (imagenesPreCargadas === totalImagenes) {
            this.iniciarCarruselNosotros();
          }
        };
        img.src = src;
      });
    }
  }

  iniciarCarruselNosotros(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intervaloNosotros = setInterval(() => {
        this.imagenActualNosotros =
          (this.imagenActualNosotros + 1) % this.imagenesNosotros.length;
        this.carruselKey++;
      }, 5000);
    }
  }

  detenerCarruselNosotros(): void {
    if (this.intervaloNosotros) {
      clearInterval(this.intervaloNosotros);
    }
  }

  siguienteActividad(): void {
    if (this.slideActualActividades < this.actividades.length - 1) {
      this.slideActualActividades++;
      this.scrollToActividad();
    }
  }

  anteriorActividad(): void {
    if (this.slideActualActividades > 0) {
      this.slideActualActividades--;
      this.scrollToActividad();
    }
  }

  irAActividad(indice: number): void {
    this.slideActualActividades = indice;
    this.scrollToActividad();
  }

  scrollToActividad(): void {
    if (isPlatformBrowser(this.platformId) && this.actividadesCarrusel) {
      const container = this.actividadesCarrusel.nativeElement;
      const articuloAncho =
        container.querySelector('.art__atv')?.clientWidth || 0;
      const gap = 16;
      const scrollAmount = (articuloAncho + gap) * this.slideActualActividades;

      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  toggleAcordeon(id: number): void {
    this.acordeonItems = this.acordeonItems.map((item) => ({
      ...item,
      activo: item.id === id ? !item.activo : false,
    }));

    this.slideActual = id - 1;
  }

  togglePregunta(id: number): void {
    this.preguntasFrecuentes = this.preguntasFrecuentes.map((pregunta) => ({
      ...pregunta,
      activo: pregunta.id === id ? !pregunta.activo : pregunta.activo,
    }));
  }

  enviarFormularioContacto(): void {
    this.validarTipoConsulta();
    this.validarNombreContacto();
    this.validarCorreoContacto();
    this.validarNumeroMovil();

    const hayErrores = Object.values(this.erroresContacto).some(
      (error) => error !== '',
    );

    if (hayErrores) {
      return;
    }

    this.enviandoFormularioContacto = true;

    const payload = {
      tipoConsulta: this.formularioContacto.tipoConsulta,
      nombre: this.formularioContacto.nombre,
      correo: this.formularioContacto.correo,
      numeroMovil: this.formularioContacto.numeroMovil,
      mensaje: this.formularioContacto.mensaje || '',
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
  .post(`${environment.apiUrl}/contacto`, payload, {
    headers,
  })
      .subscribe({
        next: (response: any) => {
          console.log('Respuesta exitosa:', response);
          this.enviandoFormularioContacto = false;
          this.mostrarModalConfirmacionContacto = true;
        },
        error: (error) => {
          console.error('Error al enviar formulario:', error);
          this.enviandoFormularioContacto = false;

          if (error.status === 400) {
            alert(
              'Error en los datos enviados. Por favor verifica el formulario.',
            );
          } else {
            alert(
              'Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.',
            );
          }
        },
      });
  }

  validarTipoConsulta(): void {
    if (!this.formularioContacto.tipoConsulta) {
      this.erroresContacto.tipoConsulta = 'Selecciona un tipo de consulta';
    } else {
      this.erroresContacto.tipoConsulta = '';
    }
  }

  validarNombreContacto(): void {
    const valor = this.formularioContacto.nombre.trim();
    if (!valor) {
      this.erroresContacto.nombre = 'El nombre es obligatorio';
    } else if (valor.length < 3) {
      this.erroresContacto.nombre = 'Debe tener al menos 3 caracteres';
    } else if (!/^[a-záéíóúñ\s]+$/i.test(valor)) {
      this.erroresContacto.nombre = 'Solo se permiten letras y espacios';
    } else {
      this.erroresContacto.nombre = '';
    }
  }

  validarCorreoContacto(): void {
    const valor = this.formularioContacto.correo.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!valor) {
      this.erroresContacto.correo = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(valor)) {
      this.erroresContacto.correo = 'Ingresa un correo electrónico válido';
    } else {
      this.erroresContacto.correo = '';
    }
  }

  validarNumeroMovil(): void {
    const valor = this.formularioContacto.numeroMovil.trim();
    const telRegex = /^[0-9]{9,15}$/;

    if (!valor) {
      this.erroresContacto.numeroMovil = 'El número de móvil es obligatorio';
    } else if (!/^[0-9]+$/.test(valor)) {
      this.erroresContacto.numeroMovil = 'Solo se permiten números';
    } else if (!telRegex.test(valor)) {
      this.erroresContacto.numeroMovil =
        'Ingresa un número válido (9-15 dígitos)';
    } else {
      this.erroresContacto.numeroMovil = '';
    }
  }

  cerrarModalConfirmacionContacto(): void {
    this.mostrarModalConfirmacionContacto = false;

    this.formularioContacto = {
      tipoConsulta: '',
      mensaje: '',
      nombre: '',
      correo: '',
      numeroMovil: '',
    };

    this.erroresContacto = {
      tipoConsulta: '',
      nombre: '',
      correo: '',
      numeroMovil: '',
    };
  }

  anteriorInstalacion(): void {
    if (this.indiceInstalacion > 0) {
      this.indiceInstalacion--;
      this.scrollToInstalacion();
    }
  }

  siguienteInstalacion(): void {
    if (this.indiceInstalacion < this.instalacionesItems.length - 1) {
      this.indiceInstalacion++;
      this.scrollToInstalacion();
    }
  }

  irAInstalacion(indice: number): void {
    this.indiceInstalacion = indice;
    this.scrollToInstalacion();
  }

  scrollToInstalacion(): void {
    if (isPlatformBrowser(this.platformId) && this.instalacionesCarrusel) {
      const container = this.instalacionesCarrusel.nativeElement;
      const slideAncho =
        container.querySelector('.instalacion__slide')?.offsetWidth || 0;
      const gap = 24;
      const scrollAmount = (slideAncho + gap) * this.indiceInstalacion;

      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  abrirModalImagen(indiceSlide: number, indiceImagen: number): void {
    this.indiceSlideActual = indiceSlide;
    this.indiceImagenActual = indiceImagen;
    this.modalImagenAbierto = true;

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  cerrarModal(): void {
    this.modalImagenAbierto = false;

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  imagenAnterior(): void {
    if (this.indiceImagenActual > 0) {
      this.indiceImagenActual--;
    }
  }

  imagenSiguiente(): void {
    if (this.indiceImagenActual < this.imagenesSlideActual.length - 1) {
      this.indiceImagenActual++;
    }
  }
}
