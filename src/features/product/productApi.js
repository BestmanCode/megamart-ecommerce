import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product/all",
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/add-product",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              draft?.push(data);
            })
          );
        } catch (err) {}
      },
    }),
    updateProductStatus: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/product/update-product-status/${productId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          productApi.util.updateQueryData("getProducts", undefined, (draft) => {
            const productIndex = draft?.findIndex(
              (product) => product._id === arg.productId
            );
            draft[productIndex].status = arg.data.status;
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          result.undo();
        }
      },
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/product/delete-product/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
} = productApi;
