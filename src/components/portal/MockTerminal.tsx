"use client"

import { useEffect, useState, useRef } from "react"
import { Terminal } from "lucide-react"

const logTemplates = [
  "ROUTE: GET /api/v1/catalog/products - Thành công 200 (14ms)",
  "IDENTITY: Xác thực token thành công cho user_982",
  "EVENT_BUS: Đã gửi sự kiện 'OrderCreatedEvent' tới ordering-api",
  "METRICS: Mức sử dụng CPU: 14.8%, Ram: 42%",
  "ROUTE: POST /api/v1/orders/checkout - Tạo thành công 201 (48ms)",
  "MERCHANT: Đồng bộ thiết lập cửa hàng cho id: 0x8ef4",
  "SYSTEM: Giải phóng bộ nhớ giải phóng 18.2MB bộ nhớ đệm",
  "GATEWAY: Kiểm tra sức khỏe hoàn tất. Toàn bộ dịch vụ hoạt động ổn định.",
  "DB_POOL: Đã dọn dẹp 3 kết nối cơ sở dữ liệu rảnh rỗi",
  "API_RATE_LIMITER: IP 192.168.1.120 đã dùng 12/60 yêu cầu/phút"
]

export function MockTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "SYS_INIT: Đang khởi động Nyxoris Gateway OS phiên bản 2.4.9...",
    "NET_BUS: Thiết lập bắt tay EventHub với RabbitMQ...",
    "AUTH_CORE: Đồng bộ cấu hình Keycloak OpenID Connect...",
    "PLATFORM_GATEWAY: Khởi tạo chính sách CORS. Port 5000 hoạt động.",
    "STATUS: Hệ thống sẵn sàng nhận yêu cầu."
  ])
  const consoleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const randomTemplate = logTemplates[Math.floor(Math.random() * logTemplates.length)]
      const timestamp = new Date().toISOString().split("T")[1].substring(0, 8)
      
      setLogs((prev) => {
        const next = [...prev, `[${timestamp}] ${randomTemplate}`]
        // Keep last 15 logs
        if (next.length > 15) {
          return next.slice(1)
        }
        return next
      })
    }, 2500)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="w-full bg-zinc-950/90 border border-white/10 rounded-2xl p-5 font-mono text-[11px] text-zinc-400 select-none shadow-2xl relative overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
          </div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest ml-2 flex items-center gap-1.5 font-sans">
            <Terminal className="w-3 h-3 text-indigo-400" />
            DỮ LIỆU ĐƯỜNG TRUYỀN HỆ THỐNG
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-emerald-500 uppercase font-bold tracking-wider font-sans">KẾT NỐI ỔN ĐỊNH</span>
        </div>
      </div>

      {/* Console output */}
      <div ref={consoleRef} className="h-44 overflow-y-auto space-y-1.5 no-scrollbar flex flex-col justify-start scroll-smooth">
        {logs.map((log, index) => {
          let lineClass = "text-zinc-400"
          if (log.includes("STATUS") || log.includes("GATEWAY") || log.includes("thành công") || log.includes("Thành công 200") || log.includes("thành công 201")) {
            lineClass = "text-emerald-400/90"
          } else if (log.includes("SYS_INIT") || log.includes("NET_BUS")) {
            lineClass = "text-indigo-400/90"
          } else if (log.includes("METRICS")) {
            lineClass = "text-sky-400/90"
          } else if (log.includes("POST")) {
            lineClass = "text-amber-400/90"
          }

          return (
            <div key={index} className={`leading-normal whitespace-pre-wrap ${lineClass}`}>
              <span className="text-zinc-600 mr-2">&gt;</span>
              {log}
            </div>
          )
        })}
      </div>
    </div>
  )
}
