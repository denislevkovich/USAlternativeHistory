import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react'
import './Timeline.css'

const MIN_ZOOM = 1
const MAX_ZOOM = 8
const ZOOM_STEP = 1.5
const START_YEAR = 1776
const END_YEAR = new Date().getFullYear()
const YEAR_SPAN = END_YEAR - START_YEAR
const YEAR_INTERVALS = [1, 2, 5, 10, 20, 25, 50, 100]

type DragState = {
  pointerId: number
  startX: number
  startView: number
}

type PinchState = {
  distance: number
  focus: number
  startView: number
  zoom: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export function Timeline() {
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [viewStart, setViewStart] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const pointers = useRef(new Map<number, number>())
  const drag = useRef<DragState | null>(null)
  const pinch = useRef<PinchState | null>(null)

  const visibleYears = YEAR_SPAN / zoom
  const yearInterval =
    YEAR_INTERVALS.find((interval) => interval >= visibleYears / 7) ?? 100
  const yearMarkers = useMemo(() => {
    const firstYear = Math.ceil(START_YEAR / yearInterval) * yearInterval
    const years: number[] = []

    for (let year = firstYear; year < END_YEAR; year += yearInterval) {
      if (year > START_YEAR) years.push(year)
    }

    return years
  }, [yearInterval])

  const maxViewStart = (nextZoom = zoom) => 1 - 1 / nextZoom

  const setZoomAt = (requestedZoom: number, focus = 0.5) => {
    const nextZoom = clamp(requestedZoom, MIN_ZOOM, MAX_ZOOM)
    const focusedPosition = viewStart + focus / zoom
    const nextStart = focusedPosition - focus / nextZoom

    setZoom(nextZoom)
    setViewStart(clamp(nextStart, 0, maxViewStart(nextZoom)))
  }

  const resetView = () => {
    setZoom(MIN_ZOOM)
    setViewStart(0)
  }

  const panBy = (amount: number) => {
    setViewStart((current) => clamp(current + amount / zoom, 0, maxViewStart()))
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    const bounds = event.currentTarget.getBoundingClientRect()
    const focus = clamp((event.clientX - bounds.left) / bounds.width, 0, 1)
    const factor = event.deltaY < 0 ? 1.16 : 1 / 1.16
    setZoomAt(zoom * factor, focus)
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    pointers.current.set(event.pointerId, event.clientX)
    setIsDragging(true)

    if (pointers.current.size === 1) {
      drag.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startView: viewStart,
      }
    }

    if (pointers.current.size === 2) {
      const [first, second] = [...pointers.current.values()]
      const bounds = event.currentTarget.getBoundingClientRect()
      const midpoint = (first + second) / 2
      pinch.current = {
        distance: Math.abs(second - first),
        focus: clamp((midpoint - bounds.left) / bounds.width, 0, 1),
        startView: viewStart,
        zoom,
      }
      drag.current = null
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, event.clientX)
    const bounds = event.currentTarget.getBoundingClientRect()

    if (pointers.current.size >= 2 && pinch.current) {
      const [first, second] = [...pointers.current.values()]
      const distance = Math.abs(second - first)
      const nextZoom = clamp(
        pinch.current.zoom * (distance / Math.max(pinch.current.distance, 1)),
        MIN_ZOOM,
        MAX_ZOOM,
      )
      const focusedPosition =
        pinch.current.startView + pinch.current.focus / pinch.current.zoom
      const nextStart = focusedPosition - pinch.current.focus / nextZoom

      setZoom(nextZoom)
      setViewStart(clamp(nextStart, 0, maxViewStart(nextZoom)))
      return
    }

    if (drag.current?.pointerId === event.pointerId) {
      const distance = event.clientX - drag.current.startX
      const timelineDistance = distance / bounds.width / zoom
      setViewStart(
        clamp(drag.current.startView - timelineDistance, 0, maxViewStart()),
      )
    }
  }

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId)
    pinch.current = null

    const remaining = [...pointers.current.entries()][0]
    if (remaining) {
      drag.current = {
        pointerId: remaining[0],
        startX: remaining[1],
        startView: viewStart,
      }
    } else {
      drag.current = null
      setIsDragging(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case '+':
      case '=':
        event.preventDefault()
        setZoomAt(zoom * ZOOM_STEP)
        break
      case '-':
      case '_':
        event.preventDefault()
        setZoomAt(zoom / ZOOM_STEP)
        break
      case 'ArrowLeft':
        event.preventDefault()
        panBy(-0.12)
        break
      case 'ArrowRight':
        event.preventDefault()
        panBy(0.12)
        break
      case 'Home':
        event.preventDefault()
        setViewStart(0)
        break
      case 'End':
        event.preventDefault()
        setViewStart(maxViewStart())
        break
      case '0':
        event.preventDefault()
        resetView()
        break
    }
  }

  const trackStyle = {
    width: `${zoom * 100}%`,
    transform: `translateX(${-viewStart * 100}%)`,
  }

  return (
    <section className="timeline" aria-labelledby="timeline-heading">
      <div className="timeline-heading-row">
        <div>
          <p className="section-label">Timeline</p>
          <h2 id="timeline-heading">Drag through history</h2>
        </div>

        <div className="timeline-controls" aria-label="Timeline zoom controls">
          <button
            type="button"
            onClick={() => setZoomAt(zoom / ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            className="zoom-level"
            onClick={resetView}
            disabled={zoom <= MIN_ZOOM}
            aria-label={`Reset timeline. Currently showing ${Math.ceil(visibleYears)} years`}
          >
            {Math.ceil(visibleYears)} years
          </button>
          <button
            type="button"
            onClick={() => setZoomAt(zoom * ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`timeline-viewport${isDragging ? ' is-dragging' : ''}`}
        role="region"
        aria-label="Interactive United States history timeline"
        aria-describedby="timeline-instructions"
        tabIndex={0}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
          <div className="timeline-track" style={trackStyle}>
          <div className="timeline-line" />
          <div className="timeline-years" aria-hidden="true">
            {yearMarkers.map((year) => (
              <span
                key={year}
                style={{ left: `${((year - START_YEAR) / YEAR_SPAN) * 100}%` }}
              >
                {year}
              </span>
            ))}
          </div>

          <div className="timeline-point timeline-point-start">
            <span className="point-dot" />
            <span className="point-label">First documented event</span>
            <span className="point-year">{START_YEAR}</span>
          </div>
          <div className="timeline-point timeline-point-end">
            <span className="point-dot" />
            <span className="point-label">Now</span>
            <span className="point-year">{END_YEAR}</span>
          </div>
        </div>
      </div>

      <div className="timeline-footer">
        <p id="timeline-instructions">
          Scroll or pinch to zoom. Drag to move through time.
        </p>
        <div className="timeline-overview" aria-hidden="true">
          <span
            style={{
              left: `${viewStart * 100}%`,
              width: `${(1 / zoom) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  )
}
