from marshmallow import Schema, fields

class MarketingContentSchema(Schema):
    """
    Schema class for marketing content data validation and serialization
    """
    id = fields.Int(dump_only=True)
    episode_id = fields.Int(required=True)
    platform = fields.Str(required=True)
    content = fields.Str(required=True)
    status = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    class Meta:
        ordered = True

# Human tasks:
# TODO: Review and validate the MarketingContentSchema fields to ensure they match the database model and API requirements
# TODO (Optional): Implement any custom validation logic specific to marketing content data