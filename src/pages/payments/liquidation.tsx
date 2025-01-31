import type React from "react"
import { useState } from "react"

export const Liquidations: React.FC = () => {
  const [settlementId, setSettlementId] = useState("")
  const [purchaseId, setPurchaseId] = useState("")
  const [currentDebt, setCurrentDebt] = useState("")
  const [status, setStatus] = useState("")

  const handleCreateSettlement = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle settlement creation logic here
    console.log("Creating settlement:", { settlementId, purchaseId, currentDebt, status })
  }

  const settlements = [
    { id: "#23456", purchaseId: "#34567", currentDebt: "$300", payment: "$300", status: "Enviada" },
    { id: "#23457", purchaseId: "#34568", currentDebt: "$400", payment: "$400", status: "Pendiente" },
    { id: "#23458", purchaseId: "#34569", currentDebt: "$500", payment: "$500", status: "Enviada" },
    { id: "#23459", purchaseId: "#34570", currentDebt: "$600", payment: "$600", status: "Pendiente" },
    { id: "#23460", purchaseId: "#34571", currentDebt: "$700", payment: "$700", status: "Enviada" },
  ]

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-6 md:px-8 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5 flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#171411] tracking-tight text-3xl font-bold leading-tight min-w-72">Liquidaciones</p>
            </div>
            <h3 className="text-[#171411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Crear liquidación
            </h3>
            <form onSubmit={handleCreateSettlement}>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#171411] text-base font-medium leading-normal pb-2">Id de liquidación</p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#171411] focus:outline-0 focus:ring-0 border border-[#e5e0dc] bg-white focus:border-[#e5e0dc] h-14 placeholder:text-[#877564] p-[15px] text-base font-normal leading-normal"
                    value={settlementId}
                    onChange={(e) => setSettlementId(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#171411] text-base font-medium leading-normal pb-2">Id de compra</p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#171411] focus:outline-0 focus:ring-0 border border-[#e5e0dc] bg-white focus:border-[#e5e0dc] h-14 placeholder:text-[#877564] p-[15px] text-base font-normal leading-normal"
                    value={purchaseId}
                    onChange={(e) => setPurchaseId(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#171411] text-base font-medium leading-normal pb-2">Deuda actual</p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#171411] focus:outline-0 focus:ring-0 border border-[#e5e0dc] bg-white focus:border-[#e5e0dc] h-14 placeholder:text-[#877564] p-[15px] text-base font-normal leading-normal"
                    value={currentDebt}
                    onChange={(e) => setCurrentDebt(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-3 p-4">
                <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#e5e0dc] px-4 h-11 text-[#171411] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#b46618] relative cursor-pointer">
                  Enviada
                  <input
                    type="radio"
                    className="invisible absolute"
                    name="status"
                    value="Enviada"
                    checked={status === "Enviada"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </label>
                <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#e5e0dc] px-4 h-11 text-[#171411] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#b46618] relative cursor-pointer">
                  Pendiente
                  <input
                    type="radio"
                    className="invisible absolute"
                    name="status"
                    value="Pendiente"
                    checked={status === "Pendiente"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex px-4 py-3 justify-end">
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#b46618] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Crear liquidación</span>
                </button>
              </div>
            </form>
            <h3 className="text-[#171411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Liquidaciones
            </h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#e5e0dc] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-120 px-4 py-3 text-left text-[#171411] w-[400px] text-sm font-medium leading-normal">
                        Id de liquidación
                      </th>
                      <th className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-240 px-4 py-3 text-left text-[#171411] w-[400px] text-sm font-medium leading-normal">
                        Id de compra
                      </th>
                      <th className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-360 px-4 py-3 text-left text-[#171411] w-[400px] text-sm font-medium leading-normal">
                        Deuda actual
                      </th>
                      <th className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-480 px-4 py-3 text-left text-[#171411] w-[400px] text-sm font-medium leading-normal">
                        Pago
                      </th>
                      <th className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-600 px-4 py-3 text-left text-[#171411] w-60 text-sm font-medium leading-normal">
                        Estado
                      </th>
                      <th className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-720 px-4 py-3 text-left text-[#171411] w-60 text-[#877564] text-sm font-medium leading-normal">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {settlements.map((settlement, index) => (
                      <tr key={index} className="border-t border-t-[#e5e0dc]">
                        <td className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-120 h-[72px] px-4 py-2 w-[400px] text-[#877564] text-sm font-normal leading-normal">
                          {settlement.id}
                        </td>
                        <td className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-240 h-[72px] px-4 py-2 w-[400px] text-[#877564] text-sm font-normal leading-normal">
                          {settlement.purchaseId}
                        </td>
                        <td className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-360 h-[72px] px-4 py-2 w-[400px] text-[#877564] text-sm font-normal leading-normal">
                          {settlement.currentDebt}
                        </td>
                        <td className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-480 h-[72px] px-4 py-2 w-[400px] text-[#877564] text-sm font-normal leading-normal">
                          {settlement.payment}
                        </td>
                        <td className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-600 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f4f2f0] text-[#171411] text-sm font-medium leading-normal w-full">
                            <span className="truncate">{settlement.status}</span>
                          </button>
                        </td>
                        <td className="table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-720 h-[72px] px-4 py-2 w-60 text-[#877564] text-sm font-bold leading-normal tracking-[0.015em]">
                          Dinero
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <style>
                {`
                @container(max-width:120px){.table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-120{display: none;}}
                @container(max-width:240px){.table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-240{display: none;}}
                @container(max-width:360px){.table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-360{display: none;}}
                @container(max-width:480px){.table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-480{display: none;}}
                @container(max-width:600px){.table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-600{display: none;}}
                @container(max-width:720px){.table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-720{display: none;}}
                @container(max-width:840px){.table-f4cd4bf7-566d-485a-ad47-e2e4e7df004d-column-840{display: none;}}
                `}
              </style>
            </div>
            <div className="flex items-center justify-center p-4">
              <a href="#" className="flex size-10 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="text-[#171411]"
                >
                  <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                </svg>
              </a>
              <a
                className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#171411] rounded-full bg-[#f4f2f0]"
                href="#"
              >
                1
              </a>
              <a
                className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#171411] rounded-full"
                href="#"
              >
                2
              </a>
              <a
                className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#171411] rounded-full"
                href="#"
              >
                3
              </a>
              <a
                className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#171411] rounded-full"
                href="#"
              >
                4
              </a>
              <a
                className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#171411] rounded-full"
                href="#"
              >
                5
              </a>
              <a href="#" className="flex size-10 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="text-[#171411]"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



