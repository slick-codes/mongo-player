<script lang="ts">
</script>

<div class="controller">
	<div class="controller__content">
		<div class="controller__button_container" />
		<div class="controller__progresssbar-container">
			<div class="controller__bar">
				<div class="progressbar">
					<div />
				</div>
			</div>
			<div class="timestamp__container">
				<div>2:15</div>
				<div>2:15</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import './../assets/scss/config';
	.controller {
		height: 10em;
		padding: $side-padding;
		padding-top: 0;

		&__content {
			// background:red;
			height: 100%;
		}

		.controller__button_container {
			padding: 2em;
		}

		.controller__bar {
			.progressbar {
				width: 100%;
				height: 0.2em;
				background: rgba(255, 255, 255, 0.175);
				overflow: hidden;
				border-radius: 4em;
				transition: transform 0.3s;

				&:hover {
					transform: scaleY(1.8);
				}

				> div {
					background: rgb(219, 219, 219);
					height: 3em;
					width: 3em;
				}
			}
		}

		.timestamp__container {
			display: flex;
			justify-content: space-between;
			color: white;
			padding-top: 0.5em;
			font-size: 0.9rem;
		}
	}
</style>
