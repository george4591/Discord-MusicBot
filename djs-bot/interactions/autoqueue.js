const SlashCommand = require("../lib/SlashCommand");
const { ccInteractionHook } = require("../util/interactions");
const { updateControlMessage } = require("../util/controlChannel");

const command = new SlashCommand()
	.setName("autoqueue")
	.setCategory("cc")
	.setDescription("Autoqueue interaction")
	.setRun(async (client, interaction) => {
		const { error, data } = await ccInteractionHook(client, interaction);

		if (error || !data || data instanceof Promise) return data;

		const { player } = data;
		const autoQueue = player.get("autoQueue");

		player.set("requester", interaction.guild.members.me);
		player.set("autoQueue", !autoQueue);

		const currentTrack = player.queue.current;
		if (currentTrack) updateControlMessage(interaction.guildId, currentTrack);

		return interaction.deferUpdate();
	});

module.exports = command;
