import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';


const FeatureList= [
  {
    title: 'Documentación de Proyectos',
    image: require('@site/static/img/undraw_docusaurus_mountain.png').default,
    description: (
      <>
        Accede a guías detalladas sobre la implementación y configuración de 
        proyectos como Odoo, N8N y otras soluciones internas.
      </>
    ),
  },
  {
    title: 'Mejora de Procesos',
    image: require('@site/static/img/undraw_docusaurus_tree.png').default,
    description: (
      <>
        Descubre cómo las herramientas desarrolladas optimizan las operaciones 
        diarias y automatizan tareas repetitivas en Marathon.
      </>
    ),
  },
  {
    title: 'Soluciones Escalables',
    image: require('@site/static/img/undraw_docusaurus_react.png').default,
    description: (
      <>
        Documentación técnica sobre arquitecturas y módulos diseñados para crecer 
        junto con las necesidades operativas de la empresa.
      </>
    ),
  },
];


function Feature({title, image, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} role="img" alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures({siteConfig}) {
  // Puedes usar siteConfig aquí si lo necesitas, por ejemplo:
  // console.log(siteConfig);
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
