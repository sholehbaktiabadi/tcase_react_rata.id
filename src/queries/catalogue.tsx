import { gql } from '@apollo/client';

export const GET_CATALOGUE = gql`
    query { 
        getAllCatalogue {
            id
            name
            category
        }
    }
`;

export const DELETE_CATALOGUE = gql`
    mutation DeleteOneCatalogue($deleteOneCatalogueId: Float!) {
        deleteOneCatalogue(id: $deleteOneCatalogueId)
    }
`