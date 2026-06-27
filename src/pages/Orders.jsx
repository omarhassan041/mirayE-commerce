import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function Orders() {
  // Tusaale dalabaad uu macaamilku sameeyay (Mock Orders Data)
  const ordersList = [
    {
      id: "ORD-98213",
      date: "June 20, 2026",
      total: 104.99,
      status: "In Transit", // Heerar kala duwan: Pending, In Transit, Delivered
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      icon: Truck,
      items: [
        { name: "Wireless Headphones Premium", quantity: 1, price: 99.99 }
      ]
    },
    {
      id: "ORD-87120",
      date: "May 14, 2026",
      total: 299.00,
      status: "Delivered",
      statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      icon: CheckCircle,
      items: [
        { name: "Smart Watch", quantity: 2, price: 149.50 }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dalabaadkaaga (Orders)</h1>
        <p className="text-sm text-gray-500 mt-1">Halkan ka la soco agabkii aad iibsatay iyo halka ay u marayso keenistoodu.</p>
      </div>

      {ordersList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Wali wax dalab ah ma aad samayn.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {ordersList.map((order) => {
            const StatusIcon = order.icon;
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                
                {/* Madaxa Dalabka (Order Header) */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100 text-sm">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">ID-ga Dalabka</p>
                      <p className="font-bold text-gray-800">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Taariikhda</p>
                      <p className="font-medium text-gray-700">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Isku-darka</p>
                      <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Status Tag */}
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${order.statusColor}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    <span>{order.status}</span>
                  </div>
                </div>

                {/* Jirka Dalabka (Order Body) */}
                <div className="p-6 divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 first:pt-0 last:pb-0">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Tirada: {item.quantity} x ${item.price}</p>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}