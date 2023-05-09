<script lang="ts">
</script>

<div class="preview__panel" style={`background-image:url(/2a392148d9f25cb269d39cebcb271179.jpg)`}>
	<div class="search" />
	<div class="details">
		<div class="image" style={`background-image:url(/2a392148d9f25cb269d39cebcb271179.jpg)`} />
		<div class="info">
			<div class="info__name">
				<h1>All Music</h1>
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

		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			backdrop-filter: blur(0.5em);
			background-blend-mode: multiply;
			background: rgb(15, 20, 30);
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
			}

			h1 {
				font-size: 3rem;
				padding-top: 1em;
				font-weight: bolder;
				color: white;
			}
		}

		.image {
			overflow: hidden;
			height: 12em;
			border-radius: 0.6em;
			box-shadow: 0px 0px 20px 7px #00000033;
			width: 12em;
			background-size: cover;
			background-repeat: no-repeat;
		}
	}
</style>
