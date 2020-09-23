const PortfolioItem = require("../models/PortfolioItem");
const CustomError = require("../helpers/error/customError");
const errorWrapper = require("../helpers/error/errorWrapper");

const addPortfolioItem = errorWrapper(async (req, res, next) => {
	const {
		title,
		shortDescription,
		content,
		portfolioTags,
		thumbnail,
		images,
		links,
	} = req.body;
	const portfolioItem = await PortfolioItem.create({
		title,
		shortDescription,
		content,
		portfolioTags,
		thumbnail,
		images,
		links,
	});
	res.status(200).json({
		success: true,
		data: portfolioItem,
	});
});

const editPortfolioItem = errorWrapper(async (req, res, next) => {
	const { id } = req.params;
	const {
		title,
		shortDescription,
		content,
		portfolioTags,
		thumbnail,
		images,
		links,
	} = req.body;

	let portfolioItem = await PortfolioItem.findById(id);

	portfolioItem.title = title;
	portfolioItem.shortDescription = shortDescription;
	portfolioItem.content = content;
	portfolioItem.portfolioTags = portfolioTags;
	portfolioItem.thumbnail = thumbnail;
	portfolioItem.images = images;
	portfolioItem.links = links;

	portfolioItem = await portfolioItem.save();

	res.status(200).json({
		success: true,
		data: portfolioItem,
	});
});

const deletePortfolioItem = errorWrapper(async (req, res, next) => {
	const { id } = req.params;

	await PortfolioItem.findByIdAndRemove(id);

	res.status(200).json({
		success: true,
		data: {},
	});
});

const getSinglePortfolioItem = errorWrapper(async (req, res, next) => {
	const { id } = req.params;
	const portfolioItem = await PortfolioItem.findById(id);

	return res.status(200).json({
		success: true,
		data: portfolioItem,
	});
});

const getAllPortfolioItems = errorWrapper(async (req, res, next) => {
	const portfolioItem = await PortfolioItem.find();

	return res.status(200).json({
		success: true,
		data: portfolioItem,
	});
});

module.exports = {
	addPortfolioItem,
	editPortfolioItem,
	deletePortfolioItem,
	getSinglePortfolioItem,
	getAllPortfolioItems,
};