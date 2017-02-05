import appSchema from '../../data/schemas/appSchema';
import wpSchema from '../../data/schemas/wpSchema';
import gfSchema from '../../data/schemas/gfSchema';

export default(app) => {
  /* ----------- App API Routes ----------- */
  /* Get Site Name and Description */
  /* Does not require a query param */
  app.get('/api/settings', (req, res) => {
    appSchema(`
      query{
        settings{
          name,
          description
        }
      }
    `)
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
  /* Get Menu */
  /* Expects query param ?name= (?name=Header) */
  app.get('/api/menu', (req, res) => {
    appSchema(`
      query get_menu($name: String) {
        menu(name: $name) {
          title,
          url,
          order,
          classes,
          children{
            title,
            url,
            order,
            classes
          }
        }
      }`, {name: req.query.name})
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
  /* ----------- Wordpress API Routes ----------- */
  /* Get Page */
  /* Expects query param ?slug= */
  app.get('/api/page', (req, res) => {
    wpSchema(`
      query get_page($slug: String) {
        active_page: page(slug: $slug) {
          title,
          content,
          slug,
          featuredImage{
            alt,
            url,
            sizes
          },
          acf,
          seo: yoast
        }
      }`, {slug: req.query.slug})
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
  /* Get Collection of Posts */
  /* Expects query param ?page= */
  app.get('/api/posts', (req, res) => {
    wpSchema(`
      query get_posts($page: Int) {
        posts(page: $page) {
          activePosts: posts{
            slug,
            title,
            content,
            featuredImage{
              alt,
              url,
              sizes
            },
            acf,
            categories{
              name,
              slug
            },
            author{
              name,
              avatar
            }
          }
          categories{
            slug,
            name,
            parent,
            count
          }
          totalItems,
          totalPages
        }
      }`, {page: req.query.page})
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
  /* Get Individual Post */
  /* Expects query param ?slug= */
  app.get('/api/post', (req, res) => {
    wpSchema(`
      query get_post($slug: String) {
        activePost: post(slug: $slug){
          slug,
          title,
          content,
          date,
          acf,
          pagination{
            next{
              slug,
              title,
              date,
              featuredImage{
                alt,
                url,
                sizes
              }
            },
            previous{
              slug,
              title,
              date,
              featuredImage{
                alt,
                url,
                sizes
              }
            },
          },
          featuredImage{
            alt,
            url,
            sizes
          },
          categories{
            name,
            slug
          },
          author{
            name,
            slug,
            avatar
          }
        }
      }`, {slug: req.query.slug})
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
  /* Get Category and Collection of Posts */
  /* Expects query param ?slug= && ?page= */
  app.get('/api/category', (req, res) => {
    wpSchema(`
      query get_category($slug: String, $page: Int) {
        category(slug: $slug) {
          details{
            slug,
            name,
            description,
            id
          }
          posts(page: $page){
            activePosts: posts{
              slug,
              title,
              content,
              featuredImage{
                alt,
                url,
                sizes
              },
              acf,
              categories{
                name,
                slug
              },
              author{
                name,
                avatar
              }
            },
            totalItems,
            totalPages
          }
        }
      }`, {slug: req.query.slug, page: req.query.page})
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
  /* Get Author and Collection of Posts */
  /* Expects query param ?name && ?page= */
  app.get('/api/author', (req, res) => {
    wpSchema(`
      query get_author($name: String, $page: Int) {
        author(name: $name) {
          details{
            slug,
            name,
            id
          }
          posts(page: $page){
            activePosts: posts{
              slug,
              title,
              content,
              featuredImage{
                alt,
                url,
                sizes
              },
              acf,
              categories{
                name,
                slug
              },
              author{
                name,
                avatar
              }
            },
            totalItems,
            totalPages
          }
        }
      }`, {name: req.query.name, page: req.query.page})
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
  /* ----------- Gravity Forms Endpoints ----------- */
  /* Get Gravity Form */
  /* Expects query param ?id= */
  app.get('/api/gravityforms', (req, res) => {
    gfSchema(`
      query get_form($id: Int) {
        form(id: $id) {
          title,
          description,
          button,
          confirmation,
          fields{
            type,
            id,
            label,
            placeholder,
            classes: cssClass,
            required: isRequired,
            choices
          }
        }
      }`, {id: req.query.id})
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
};
