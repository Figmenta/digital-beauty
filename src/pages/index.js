import { gql } from "@apollo/client";
import { client } from "@/lib/apolloClient";
import Layout from "@/components/Layout";
import PicturesArchive from "@/components/PicturesArchive";

const GET_MENU = gql`
  query getMainMenu {
    menu(id: "Main Menu", idType: NAME) {
      menuItems {
        nodes {
          label
          url
        }
      }
    }
  }
`;

const GET_PICTURES = gql`
  query getPictures {
    pictures(first: 500) {
      nodes {
        title
        content
        pictureFile {
          pictureFile {
            node {
              altText
              sourceUrl
              mediaDetails {
                width
                height
              }
            }
          }
          pictureLink
        }
        categories {
          nodes {
            name
          }
        }
        styles {
          nodes {
            name
          }
        }
        formats {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  query getCategories {
    categories(first: 50) {
      nodes {
        name
        categoryImage {
          selectFile {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export default function Home({ menu, pictures, categories, error }) {
  return (
    <Layout mainMenu={menu}>
      <PicturesArchive pictures={pictures} categories={categories} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: mainMenuData } = await client.query({
    query: GET_MENU,
  });
  const { data: picturesData } = await client.query({
    query: GET_PICTURES,
  });
  const { data: catData } = await client.query({
    query: GET_CATEGORIES,
  });

  return {
    props: {
      menu: mainMenuData.menu.menuItems.nodes,
      pictures: picturesData.pictures.nodes,
      categories: catData.categories.nodes,
    },
  };
}
