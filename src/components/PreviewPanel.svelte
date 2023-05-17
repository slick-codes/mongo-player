<script lang="ts">
	import { trackData } from './../store/main.ts';
	let trackMetaData = {};
	trackData.subscribe((value) => (trackMetaData = value));

</script>

<div
	class="preview__panel"
	style={`background-image:url(${
		trackMetaData.image ?? '/default.png'
	})`}
>
	<div class="search" />
	<div class="details">
		<div
			class="image"
			style={`background-image:url(${
				trackMetaData.image ?? '/default.png'
			})`}
		/>
		<div class="info">
			<div class="info__name">
				<h1>{trackMetaData.title ?? trackMetaData.filename ?? "Mongoplayer"}</h1>
				<h3>{trackMetaData.artist ?? "Paul Ezekiel-Hart"}</h3>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import './../assets/scss/config';

	.preview__panel {
		height: 19em;
		background: blue;
		position: relative;
		// background-position: center left;
		background-repeat: no-repeat;
		background-size: cover;
		// border-radius: 1em;
		padding:0px 1em;

		&:after {
			content: '';
			position: absolute;
			border-radius: inherit;
			top: 0;
			left: 0;
			backdrop-filter: blur(0.5em);
			background-blend-mode: multiply;
			background: rgba(15, 20, 30, .9);
			background: linear-gradient(
				0deg,
				rgba(15, 20, 30, 1) 4%,
				rgba(15, 20, 30, 0.4458158263305322) 100%
			);
			z-index: 0;
			width: 100%;
			height: 100%;
		}

		.search {
			position: relative;
			padding: 1em;
			z-index: 11;
		}

		.details {
			position: relative;
			z-index: 14;
			display: flex;
			align-items: center;
			padding-left: $side-padding;

			.info {
				padding-left: calc($side-padding - 1em);
				width: calc(100% - 14em);

				> div{
					width:inherit;
					overflow:hidden;
				}
			}

			h1 {
				width:100%;
				font-size: 3rem;
				padding-top: 1em;
				white-space:nowrap;
				font-weight: bolder;
				font-size: 1.7rem;
				color: #e6e6e6;
				text-shadow: 0px 0px 4em black;
			}
			h3{
				font-weight:bolder;
				color:white;
				font-size:1.2rem;
			}
		}

		.image {
			overflow: hidden;
			height: 12em;
			border-radius: 0.6em;
			box-shadow: 0px 0px 20px 7px #00000033;
			width: 12em;
			position:relative;
			background-size: cover;
			background-repeat: no-repeat;
		}
	}
</style>
