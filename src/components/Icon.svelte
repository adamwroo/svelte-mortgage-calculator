<script>
    const viewBoxSize = 512;

    // roof
    const roofBaseCenter = { x: viewBoxSize / 2, y: viewBoxSize / 2 };
    const roofLineWidth = 55;

    // percent svg
    const percentSvgCenter = { x: viewBoxSize / 2, y: viewBoxSize * 2 / 3 };
    const percentCircleRadius = 65;
    const lineWidthPercent = roofLineWidth;
    const percentSvgRadius = viewBoxSize - percentSvgCenter.y;
    const percentSvg  = {
        x: percentSvgCenter.x - percentSvgRadius,
        y: percentSvgCenter.y - percentSvgRadius,
        width: percentSvgRadius * 2,
        height: percentSvgRadius * 2
    };
    const percentStart = (percentSvgRadius * Math.sqrt(2) - percentSvgRadius) / Math.sqrt(2);

</script>

<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <style>
        .favicon-stroke {
            stroke: #B62121;
        }

        .favicon-fill {
            fill: #B62121;;
        }
    </style>

    <!-- <rect width="100%" height="100%" style="fill-opacity:1" fill="white"/> -->

    <g id="roof">
        <line class="favicon-stroke"
            x1="{viewBoxSize / 2}"
            y1="{roofLineWidth / 2}"
            x2="{roofLineWidth / 2}"
            y2="{roofBaseCenter.y}"
            stroke-width="{roofLineWidth}"
            stroke-linecap="round"
        />
        <line class="favicon-stroke"
            x1="{viewBoxSize / 2}"
            y1="{roofLineWidth / 2}"
            x2="{viewBoxSize - roofLineWidth / 2}"
            y2="{roofBaseCenter.y}"
            stroke-width="{roofLineWidth}"
            stroke-linecap="round"
        />
    </g>

    <svg 
        x={percentSvg.x}
        y={percentSvg.y}
        width={percentSvg.width}
        height={percentSvg.height}
    >

        <!-- <rect width="100%" height="100%" style="fill-opacity:0.3" fill="yellow"/>
        <circle
            cx="{percentSvgRadius}"
            cy="{percentSvgRadius}"
            r="{percentSvgRadius}"
            style="fill-opacity:0.3" fill="orange"
        /> -->

        <g id="percent">
            <circle class="favicon-fill"
                cx="{percentStart + percentCircleRadius / Math.sqrt(2)}"
                cy="{percentStart + percentCircleRadius / Math.sqrt(2)}"
                r="{percentCircleRadius}"
            />
            <circle class="favicon-fill"
                cx="{percentSvg.width - percentStart - percentCircleRadius / Math.sqrt(2)}"
                cy="{percentSvg.height - percentStart - percentCircleRadius / Math.sqrt(2)}"
                r="{percentCircleRadius}"
            />
            <line  class="favicon-stroke"
                x1="{percentStart + lineWidthPercent / Math.sqrt(2) / 2}"
                y1="{percentSvg.height - percentStart - lineWidthPercent / Math.sqrt(2) / 2}"
                x2="{percentSvg.width - percentStart - lineWidthPercent / Math.sqrt(2) / 2}"
                y2="{percentStart + lineWidthPercent / Math.sqrt(2) / 2}"
                stroke="black"
                stroke-width="{lineWidthPercent}"
                stroke-linecap="round"
            />
        </g>
    </svg>
</svg>


<style>
    /* see: https://pragmaticpineapple.com/smoothly-reverting-css-animations/ */
    svg #percent {
        transition: transform 1s ease-in-out;
        transform-origin: 50% 50%;
        /* without this line, the path would rotate about the entire svg's viewbox */
        transform-box: view-box;
    }

    svg:hover #percent {
        transform: rotate(180deg);
        transform-origin: 50% 50%;
        /* without this line, the path would rotate about the entire svg's viewbox */
        transform-box: view-box;
    }
</style>