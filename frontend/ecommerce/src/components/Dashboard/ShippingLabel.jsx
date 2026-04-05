const ShippingLabel = ({ order }) => {
  const customerName =
    order.user?.name ||
    order.guestInfo?.name ||
    order.shippingAddress?.name ||
    "Customer";

  const address = [
    order.shippingAddress?.address,
    order.shippingAddress?.district,
    order.shippingAddress?.division,
  ]
    .filter(Boolean)
    .join(", ");

  const items = order.items || [];
  const totalQty = items.reduce((s, i) => s + (i.quantity || 1), 0);

  const shortId = order._id?.slice(-8).toUpperCase();

  const amount = Number(order.totalAmount || 0);

  return (
    <div
      style={{
        width: "100mm",
        minHeight: "150mm",
        border: "2px solid #1d4c9e",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff",
        overflow: "hidden",
        pageBreakInside: "avoid",
      }}
    >

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg,#0f2d6e,#1d4c9e)",
        color: "#fff",
        padding: "8px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: "18px", fontWeight: "900" }}>
            ⚡ ZapZone <span style={{ color: "#fbbf24" }}>BD</span>
          </div>
          <div style={{ fontSize: "9px", color: "#bfdbfe" }}>
            zapzonebd.com | 016XXXXXXXX
          </div>
        </div>

        <div style={{
          background: "#fbbf24",
          color: "#1e3a8a",
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "10px",
          fontWeight: "900",
        }}>
          COD
        </div>
      </div>

      {/* ORDER INFO */}
      <div style={{
        background: "#f1f5f9",
        padding: "6px 12px",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "10px",
      }}>
        <span>Order: #{shortId}</span>
        <span>{new Date(order.createdAt).toLocaleDateString("en-GB")}</span>
      </div>

      {/* CUSTOMER */}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: "16px", fontWeight: "900" }}>
          {customerName}
        </div>

        <div style={{
          fontSize: "18px",
          fontWeight: "900",
          color: "#1d4c9e",
          marginTop: "4px",
        }}>
          📞 {order.shippingAddress?.phone || "N/A"}
        </div>

        <div style={{ fontSize: "11px", marginTop: "6px" }}>
          {address}
        </div>
      </div>

      {/* COD */}
      <div style={{
        margin: "8px 12px",
        background: "#fef3c7",
        border: "2px solid #f59e0b",
        borderRadius: "8px",
        padding: "8px",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: "9px", fontWeight: "700" }}>
            COD AMOUNT
          </div>
          <div style={{ fontSize: "22px", fontWeight: "900" }}>
            ৳ {amount}
          </div>
        </div>

        <div style={{
          background: "#f59e0b",
          color: "#fff",
          padding: "6px",
          fontSize: "10px",
          fontWeight: "900",
        }}>
          CASH<br />ON DELIVERY
        </div>
      </div>

      {/* ITEMS */}
      <div style={{ padding: "6px 12px" }}>
        <div style={{ fontSize: "10px", fontWeight: "700" }}>
          ITEMS ({totalQty})
        </div>

        {items.slice(0, 3).map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
              borderBottom: "1px solid #eee",
              padding: "2px 0",
            }}
          >
            <span>
              {item.product?.name || "Product"}
            </span>
            <span>×{item.quantity}</span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{
        background: "#0f2d6e",
        color: "#93c5fd",
        padding: "6px 12px",
        fontSize: "9px",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <span>Thank you ❤️</span>
        <span>ZapZone BD</span>
      </div>

    </div>
  );
};

export default ShippingLabel;