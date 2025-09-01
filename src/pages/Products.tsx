import { useCart } from "../hooks/cartContext";

export default function Products() {
  const {
    products,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cart,
    total,
  } = useCart();
  return (
    <>
      <div className="mx-auto mt-40 grid max-w-5xl grid-cols-2 gap-x-12 gap-y-8">
        {cart?.map((item) => (
          <div
            className=" mb-4 flex break-words rounded-sm border border-tahiti-cardBorder px-8 py-4 duration-300 ease-in hover:scale-110"
            key={item.id}
          >
            <img
              src={item.imageURL}
              alt={item.title}
              className="rounded-tl-[calc(.25rem - 1px)] rounded-tr-[calc(.25rem - 1px)] m-auto mb-2 h-48 w-[50%] rounded-lg p-1"
            />
            <div className="flex flex-col">
              <p className="mb-2">
                <span className="font-semibold">Product:</span> {item.title}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Color:</span> {item.color}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Price: </span>
                <span className="line-through">{item.salePrice} EGP</span>
                <span> &ensp;{item.price} EGP</span>
              </p>
              <div className="mt-2 flex items-center justify-between">
                {cart.map((item) => (
                  <div className="m-auto mb-3 flex w-[90%] items-center justify-between rounded-md bg-white p-2 shadow">
                    <span className="text-sm font-bold text-tahiti">
                      {item.title}
                    </span>
                    <span className="text-xs font-bold text-tahiti">
                      {item.quantity}
                    </span>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() =>
                          decreaseQuantity && decreaseQuantity(item.id)
                        }
                        className="text-md font-bold text-red-500 hover:opacity-70"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          increaseQuantity && increaseQuantity(item.id)
                        }
                        className="text-md font-bold text-green-600 hover:opacity-70"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="rounded-md bg-tahiti px-2 py-1 font-bold text-white hover:bg-tahiti-dark"
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                >
                  Remove From Cart
                </button>
              </div>
              {/* <Icon
                icon="mdi:favorite-border"
                width="30"
                height="30"
                className="cursor-pointer text-tahiti-favoriteIcon"
              /> */}
            </div>
          </div>
        ))}
      </div>
      <p className="border-b-2 border-tahiti p-8 text-center font-bold">
        Total &nbsp; {total} EGP
      </p>
    </>
  );
}
